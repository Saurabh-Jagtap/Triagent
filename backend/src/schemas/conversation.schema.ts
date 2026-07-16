import { z } from "zod";

export const MissingFieldSchema = z.enum([
    "recipientEmail",

    "title",
    "attendees",
    "startTime",
    "endTime",
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
    recipientName: z.string().optional(),
    recipientEmail: z.string().optional(),
    subject: z.string().optional(),
    body: z.string().optional(),

    title: z.string().optional(),
    attendees: z.array(z.string()).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
});

export const ConversationResultSchema = z.object({
    intent: IntentSchema,
    state: ConversationStateSchema,
    collected: CollectedSchema,
    missing: z.array(MissingFieldSchema),
    reply: z.string(),
});

export type ConversationResult = z.infer<typeof ConversationResultSchema>;