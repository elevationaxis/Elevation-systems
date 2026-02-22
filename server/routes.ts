import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertAuditSchema } from "@shared/schema";
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
      runAudit(submission.id).catch(err => console.error("Audit run error:", err));
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

  return httpServer;
}
