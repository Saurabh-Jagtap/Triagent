import { ExecutionPlanSchema  } from "@repo/db/src/index.js";
import { z } from "zod";


export const ExecuteActionSchema = z.object({
    plan: ExecutionPlanSchema,
});

export type ExecuteActionInput = z.infer<typeof ExecuteActionSchema>;