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

export const ExecuteActionSchema = z.object({ action: ExecuteEmailSchema });

export type ExecuteActionInput = z.infer<typeof ExecuteActionSchema>;