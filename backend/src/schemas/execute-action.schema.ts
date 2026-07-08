import { z } from "zod";

export const ExecuteEmailSchema = z.object({
    id: z.string(),
    tool: z.literal("gmail"),
    status: z.literal("pending"),
    payload: z.object({
        to: z.string().email(),
        subject: z.string(),
        body: z.string(),
    }),
});

export const ExecuteCalendarSchema = z.object({
    id: z.string(),
    tool: z.literal("calendar"),
    status: z.literal("pending"),
    payload: z.object({
        title: z.string(),
        attendees: z.array(z.string().email()),
        startTime: z.string(),
        endTime: z.string(),
    }),
});

const ExecutePendingActionSchema = z.discriminatedUnion("tool", [ExecuteEmailSchema, ExecuteCalendarSchema]);

export const ExecuteActionSchema = z.object({ action: ExecutePendingActionSchema, });

export type ExecuteActionInput = z.infer<typeof ExecuteActionSchema>;