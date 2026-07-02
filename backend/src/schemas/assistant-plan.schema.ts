import { z } from "zod";

export const GmailActionSchema = z.object({
  tool: z.literal("gmail"),
  payload: z.object({
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
  }),
});

export const AssistantPlanSchema = z.object({
  reply: z.string(),
  actions: z.array(GmailActionSchema),
});

export type AssistantPlan = z.infer<typeof AssistantPlanSchema>;
