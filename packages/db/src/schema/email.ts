import { boolean, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const emails = pgTable("emails", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: text("tenant_id").notNull(),
  gmailMessageId: text("gmail_message_id").notNull(),
  gmailThreadId: text("gmail_thread_id").notNull().unique(),

  subject: text("subject").notNull(),
  from: text("from").notNull(),
  to: text("to").array().notNull().default([]),
  snippet: text("snippet"),
  body: text("body"),

  labels: text("labels").array().notNull().default([]),
  isRead: boolean("is_read").notNull().default(false),
  historyId: text("history_id"),

  receivedAt: timestamp("received_at", {withTimezone: true}),
  raw: jsonb("raw"),

  createdAt: timestamp("created_at", {withTimezone: true}).defaultNow(),
  updatedAt: timestamp("updated_at", {withTimezone: true}).defaultNow(),
});