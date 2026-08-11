import { z } from "zod";
import { ExecutionPlanSchema } from "@repo/db";

export const ExecuteActionSchema = z.object({
    plan: ExecutionPlanSchema,
});

export type ExecuteActionInput = z.infer<typeof ExecuteActionSchema>;