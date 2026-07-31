import { z } from "zod";

export const GmailActionSchema = z.object({
  tool: z.literal("gmail"),
  payload: z.object({
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
  }),
});

export const CalendarActionSchema = z.object({
  tool: z.literal("calendar"),
  payload: z.object({
    title: z.string(),
    attendees: z.array(z.string().email()),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const OperationSchema = z.enum([
  "search",
  "summarize",
  "compose",
  "reply",
  "schedule",
  "create",
  "update",
  "delete",
]);

export const ResourceSchema = z.enum([
  "message",
  "messages",
  "meeting",
]);

export const TaskSchema = z.object({
  operation: OperationSchema,
  resource: ResourceSchema,

  recipientName: z.string().optional(),
  recipientEmail: z.string().email().optional(),

  attendeeNames: z.array(z.string()).optional(),
  attendeeEmails: z.array(z.string().email()).optional(),

  timeframe: z.string().optional(),
  purpose: z.string().optional(),
  startTime: z.string().optional(),
});

export const AssistantPlanSchema = z.object({
  reply: z.string(),
  approvalRequired: z.boolean(),
  task: TaskSchema,
});

export type GmailAction = z.infer<typeof GmailActionSchema>;

export type CalendarAction = z.infer<typeof CalendarActionSchema>;

export type AssistantAction =
  | GmailAction
  | CalendarAction;

export type AssistantPlan = z.infer<typeof AssistantPlanSchema>;
