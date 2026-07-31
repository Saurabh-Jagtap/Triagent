import type { AssistantPlan } from "../../../schemas/assistant-plan.schema.js";
import type { ExecutionResult } from "../../execution.types.js";
import type { GmailOperation } from "./operation.interface.js";

export class SummarizeOperation implements GmailOperation {

    supports(plan: AssistantPlan): boolean {

        return plan.task.operation === "summarize";

    }

    async execute(plan: AssistantPlan): Promise<ExecutionResult> {

        return {

            status: "completed",

            reply: "Summarize operation not implemented yet."

        };

    }

}