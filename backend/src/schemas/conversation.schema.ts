import { z } from "zod";

export const MissingFieldSchema = z.enum([
    // Gmail
    "recipientEmail",

    // Calendar
    "attendeeEmails",
    "startTime",
]);

export const IntentSchema = z.enum([
    "gmail",
    "calendar",
]);

export const TaskStatusSchema = z.enum([
    "collecting",
    "planning",
    "approval",
    "completed",
]);

export const ConversationStateSchema = z.enum([
    "collecting",
    "ready",
]);

export const CollectedSchema = z.object({
    // Gmail
    recipientName: z.string().optional(),
    recipientEmail: z.string().optional(),

    // Calendar
    attendeeNames: z.array(z.string()).optional(),
    attendeeEmails: z.array(z.string().email()).optional(),
    startTime: z.string().optional(),
});

export const ConversationResultSchema = z.object({
    intent: IntentSchema,
    state: ConversationStateSchema,
    collected: CollectedSchema,
    missing: z.array(MissingFieldSchema),
    reply: z.string(),
});

export type ConversationResult = z.infer<typeof ConversationResultSchema>;