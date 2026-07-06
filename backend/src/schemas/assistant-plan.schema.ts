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

export const AssistantActionSchema = z.discriminatedUnion(
  "tool",
  [
    GmailActionSchema,
    CalendarActionSchema,
  ]
);

export const AssistantPlanSchema = z.object({
  reply: z.string(),
  actions: z.array(AssistantActionSchema),
});

export type AssistantPlan = z.infer<typeof AssistantPlanSchema>;
