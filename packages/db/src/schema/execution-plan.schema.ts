import { z } from "zod";
import { TaskSchema } from "./assistant-plan.schema.js";

const ComposeExecutionSchema = z.object({
    tool: z.literal("gmail"),
    operation: z.literal("compose"),
    payload: z.object({
        to: z.string().email(),
        subject: z.string(),
        body: z.string(),
    }),
});

const ReplyExecutionSchema = z.object({
    tool: z.literal("gmail"),
    operation: z.literal("reply"),
    payload: z.object({
        messageId: z.string(),
        body: z.string(),
    }),
});

const SummarizeExecutionSchema = z.object({
    tool: z.literal("gmail"),
    operation: z.literal("summarize"),
    payload: z.object({
        timeframe: z.string(),
    }),
});

const SearchExecutionSchema = z.object({
    tool: z.literal("gmail"),
    operation: z.literal("search"),
    payload: z.object({
        query: z.string(),
    }),
});

const ScheduleMeetingExecutionSchema = z.object({
    tool: z.literal("calendar"),
    operation: z.literal("schedule"),
    payload: z.object({
        title: z.string(),
        attendees: z.array(z.string().email()),
        startTime: z.string(),
        endTime: z.string(),
    }),
});

export const ExecutionSchema = z.discriminatedUnion("operation", [
    ComposeExecutionSchema,
    ReplyExecutionSchema,
    SummarizeExecutionSchema,
    SearchExecutionSchema,
    ScheduleMeetingExecutionSchema,
]);

export const ExecutionPlanSchema = z.object({
    reply: z.string(),
    task: TaskSchema,
    execution: ExecutionSchema,
});

export type ExecutionPlan = z.infer<typeof ExecutionPlanSchema>;
export type ComposeExecution = z.infer<typeof ComposeExecutionSchema>;
export type ReplyExecution = z.infer<typeof ReplyExecutionSchema>;
export type SummarizeExecution = z.infer<typeof SummarizeExecutionSchema>;
export type SearchExecution = z.infer<typeof SearchExecutionSchema>;
export type ScheduleMeetingExecution = z.infer<typeof ScheduleMeetingExecutionSchema>;