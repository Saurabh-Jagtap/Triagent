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

export const GoalSchema = z.enum([
    "search",
    "summarize",
    "send",
    "reply",
    "draft",
    "schedule",
    "create",
    "update",
    "delete",
    "answer",
]);

export const DomainSchema = z.enum([
    "gmail",
    "calendar",
]);

export const CollectedSchema = z.object({
    // Gmail
    recipientName: z.string().optional(),
    recipientEmail: z.string().optional(),

    // Calendar
    attendeeNames: z.array(z.string()).optional(),
    attendeeEmails: z.array(z.string().email()).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    durationMinutes: z.number().positive().optional(),
});

export const ConversationResultSchema = z.object({
    goal: GoalSchema,
    domain: DomainSchema,
    state: ConversationStateSchema,
    collected: CollectedSchema,
    missing: z.array(MissingFieldSchema),
    reply: z.string(),
});

export type ConversationResult = z.infer<typeof ConversationResultSchema>;