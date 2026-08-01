import { z } from "zod";

export const ImportantEmailSchema = z.object({
  sender: z.string(),
  subject: z.string(),
  reason: z.string(),
});

export const ActionItemSchema = z.object({
  title: z.string(),
  reason: z.string(),
});

export const DeadlineSchema = z.object({
  title: z.string(),
  due: z.string(),
});

export const EmailCategoriesSchema = z.object({
  security: z.number(),
  work: z.number(),
  meetings: z.number(),
  finance: z.number(),
  recruitment: z.number(),
  notifications: z.number(),
  newsletters: z.number(),
  promotions: z.number(),
});

export const EmailSummarySchema = z.object({
  summary: z.string(),
  important: z.array(ImportantEmailSchema),
  actionItems: z.array(ActionItemSchema),
  deadlines: z.array(DeadlineSchema),
  categories: EmailCategoriesSchema,
});

export type EmailSummary = z.infer<typeof EmailSummarySchema>;