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

export const AssistantPlanSchema = z.object({
  reply: z.string(),

  actions: z.array(
    z.union([
      GmailActionSchema,
      CalendarActionSchema,
    ])
  ),
});

export type GmailAction = z.infer<typeof GmailActionSchema>;

export type CalendarAction = z.infer<typeof CalendarActionSchema>;

export type AssistantAction =
  | GmailAction
  | CalendarAction;

export type AssistantPlan = z.infer<typeof AssistantPlanSchema>;
