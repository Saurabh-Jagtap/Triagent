import type { AssistantPlan } from "../../schemas/assistant-plan.schema.js";
import type { Executor } from "../execution.interface.js";
import type { ExecutionResult } from "../execution.types.js";

export class CalendarExecutor implements Executor {

    supports(plan: AssistantPlan): boolean {
        return plan.task.resource === "meeting";
    }

    async execute(plan: AssistantPlan): Promise<ExecutionResult> {
        return {
            status: "failed",
            reply: "Not implemented yet.",
        };
    }
}