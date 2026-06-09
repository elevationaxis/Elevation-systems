import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  businessName: text("business_name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const auditSubmissions = pgTable("audit_submissions", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  email: text("email").notNull(),
  websiteUrl: text("website_url").notNull(),
  city: text("city").default(""),
  industry: text("industry").default(""),
  status: text("status").notNull().default("processing"),
  overallScore: integer("overall_score"),
  siteSpeedScore: integer("site_speed_score"),
  siteSpeedData: jsonb("site_speed_data"),
  leadPlumbingScore: integer("lead_plumbing_score"),
  leadPlumbingData: jsonb("lead_plumbing_data"),
  localVisibilityScore: integer("local_visibility_score"),
  localVisibilityData: jsonb("local_visibility_data"),
  competitorScore: integer("competitor_score"),
  competitorData: jsonb("competitor_data"),
  recommendations: jsonb("recommendations"),
  visibilityLeak: jsonb("visibility_leak"),
  trustLeak: jsonb("trust_leak"),
  conversionLeak: jsonb("conversion_leak"),
  responseLeak: jsonb("response_leak"),
  growthLeak: jsonb("growth_leak"),
  biggestLeak: jsonb("biggest_leak"),
  competitors: jsonb("competitors"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const resourceUnlocks = pgTable("resource_unlocks", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  resourceKey: text("resource_key").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertResourceUnlockSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  resourceKey: z.string().min(1),
});

export type InsertResourceUnlock = z.infer<typeof insertResourceUnlockSchema>;
export type ResourceUnlock = typeof resourceUnlocks.$inferSelect;

export const insertAuditSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Please enter a valid email"),
  websiteUrl: z.string().url("Please enter a valid website URL"),
  city: z.string().min(1, "City is required"),
  industry: z.string().min(1, "Industry is required"),
});

export type InsertAudit = z.infer<typeof insertAuditSchema>;
export type AuditSubmission = typeof auditSubmissions.$inferSelect;
