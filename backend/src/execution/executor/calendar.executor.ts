import type { ExecutionPlan } from "@repo/db/src/index.js";
import type { Executor } from "../execution.interface.js";
import type { ExecutionResult } from "../execution.types.js";

export class CalendarExecutor implements Executor {

    supports(plan: ExecutionPlan): boolean {
        return plan.task.resource === "meeting";
    }

    async execute(plan: ExecutionPlan): Promise<ExecutionResult> {
        return {
            status: "failed",
            artifact: {
                kind: "text",
                content: "Calendar execution is not implemented yet.",
            },
        };
    }
}