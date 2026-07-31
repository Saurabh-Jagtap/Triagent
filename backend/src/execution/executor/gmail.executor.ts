import type { AssistantPlan } from "../../schemas/assistant-plan.schema.js";
import type { Executor } from "../execution.interface.js";
import type { ExecutionResult } from "../execution.types.js";
import { SummarizeOperation } from "./gmail/summarize.operation.js";

export class GmailExecutor implements Executor {
    private operations = [new SummarizeOperation()];

    supports(plan: AssistantPlan): boolean {
        return (
            plan.task.resource === "message" ||
            plan.task.resource === "messages"
        );
    }

    async execute(plan: AssistantPlan): Promise<ExecutionResult> {
        const operation = this.operations.find(operation => operation.supports(plan));

        if (!operation) {
            throw new Error(`Unsupported Gmail operation: ${plan.task.operation}`);
        }

        return operation.execute(plan);
    }
}