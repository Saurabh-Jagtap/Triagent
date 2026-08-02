import type { AssistantPlan } from "@repo/db/src/index.js";
import type { ExecutionResult } from "../../execution.types.js";
import type { GmailOperation } from "./operation.interface.js";

export class ComposeOperation implements GmailOperation {

    supports(plan: AssistantPlan): boolean {
        return plan.task.operation === "compose";
    }

    async execute(plan: AssistantPlan,tenantId: string): Promise<ExecutionResult> {

        throw new Error("Compose operation not implemented yet.");

    }
}