import { type User, type InsertUser, type ContactSubmission, type InsertContact, type AuditSubmission, users, contactSubmissions, auditSubmissions } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(data: InsertContact): Promise<ContactSubmission>;
  createAuditSubmission(data: { businessName: string; email: string; websiteUrl: string }): Promise<AuditSubmission>;
  getAuditSubmission(id: number): Promise<AuditSubmission | undefined>;
  updateAuditSubmission(id: number, data: Partial<AuditSubmission>): Promise<AuditSubmission>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactSubmission(data: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(data).returning();
    return submission;
  }

  async createAuditSubmission(data: { businessName: string; email: string; websiteUrl: string }): Promise<AuditSubmission> {
    const [submission] = await db.insert(auditSubmissions).values({
      businessName: data.businessName,
      email: data.email,
      websiteUrl: data.websiteUrl,
      status: "processing",
    }).returning();
    return submission;
  }

  async getAuditSubmission(id: number): Promise<AuditSubmission | undefined> {
    const [submission] = await db.select().from(auditSubmissions).where(eq(auditSubmissions.id, id));
    return submission;
  }

  async updateAuditSubmission(id: number, data: Partial<AuditSubmission>): Promise<AuditSubmission> {
    const [updated] = await db.update(auditSubmissions).set(data).where(eq(auditSubmissions.id, id)).returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
