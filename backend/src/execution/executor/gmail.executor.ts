import type { ExecutionPlan } from "@repo/db/src/index.js";
import type { Executor } from "../execution.interface.js";
import type { ExecutionResult } from "../execution.types.js";
import { ComposeOperation } from "./gmail/compose.operation.js";
import { SummarizeOperation } from "./gmail/summarize.operation.js";

export class GmailExecutor implements Executor {
    private operations = [
        new SummarizeOperation(),
        new ComposeOperation(),
    ];

    supports(plan: ExecutionPlan): boolean {
        return plan.execution.tool === "gmail";
    }

    async execute(plan: ExecutionPlan, tenantId: string): Promise<ExecutionResult> {
        const operation = this.operations.find(operation => operation.supports(plan));

        if (!operation) {
            throw new Error(`Unsupported Gmail operation: ${plan.task.operation}`);
        }

        return operation.execute(plan, tenantId);
    }
}