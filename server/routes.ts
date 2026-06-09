import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertAuditSchema, insertResourceUnlockSchema } from "@shared/schema";
import { runAudit } from "./auditEngine";
import { sendContactNotification, sendAuditNotification } from "./mailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid form data", errors: parsed.error.flatten() });
      }
      const submission = await storage.createContactSubmission(parsed.data);
      sendContactNotification(parsed.data).catch(err => console.error("Contact email error:", err));
      return res.status(201).json({ message: "Thank you for your inquiry. I will be in touch shortly.", id: submission.id });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  app.post("/api/audit", async (req, res) => {
    try {
      const parsed = insertAuditSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid form data", errors: parsed.error.flatten() });
      }
      const submission = await storage.createAuditSubmission(parsed.data);
      runAudit(submission.id, storage).catch(err => console.error("Audit run error:", err));
      sendAuditNotification({ ...parsed.data, auditId: submission.id }).catch(err => console.error("Audit email error:", err));
      return res.status(201).json({ id: submission.id, status: "processing" });
    } catch (error) {
      console.error("Audit creation error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  app.get("/api/audit/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid audit ID" });
      }
      const audit = await storage.getAuditSubmission(id);
      if (!audit) {
        return res.status(404).json({ message: "Audit not found" });
      }
      return res.json(audit);
    } catch (error) {
      console.error("Audit fetch error:", error);
      return res.status(500).json({ message: "Something went wrong." });
    }
  });

  // Admin dashboard — password-protected submissions view
  const ADMIN_KEY = process.env.ADMIN_PASSWORD || "elevationaxis2026";

  app.get("/api/admin/submissions", async (req, res) => {
    try {
      const key = req.headers["x-admin-key"];
      if (key !== ADMIN_KEY) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const submissions = await storage.getAllAuditSubmissions();
      const total = submissions.length;
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const thisWeek = submissions.filter(s =>
        new Date(s.createdAt) >= oneWeekAgo
      ).length;
      const completed = submissions.filter(s => s.overallScore !== null);
      const avgScore = completed.length > 0
        ? Math.round(completed.reduce((sum, s) => sum + (s.overallScore || 0), 0) / completed.length)
        : 0;
      return res.json({
        submissions: submissions.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        total,
        thisWeek,
        avgScore,
      });
    } catch (error) {
      console.error("Admin fetch error:", error);
      return res.status(500).json({ message: "Something went wrong." });
    }
  });

  // Resource gate — record email, return signed download path
  const RESOURCE_MAP: Record<string, string> = {
    "website-leak-checklist": "/downloads/EAWebsiteLeakChecklist.pdf",
    "google-listing-guide": "/downloads/EAGoogleListingQuickFixGuide.pdf",
  };

  app.post("/api/resource-unlock", async (req, res) => {
    try {
      const parsed = insertResourceUnlockSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid request", errors: parsed.error.flatten() });
      }
      const { email, resourceKey } = parsed.data;
      const downloadPath = RESOURCE_MAP[resourceKey];
      if (!downloadPath) {
        return res.status(404).json({ message: "Resource not found" });
      }
      await storage.createResourceUnlock({ email, resourceKey });
      return res.status(200).json({ downloadUrl: downloadPath });
    } catch (error) {
      console.error("Resource unlock error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  return httpServer;
}
