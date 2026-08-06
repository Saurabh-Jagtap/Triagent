import type { AssistantPlan, ExecutionPlan } from "@repo/db/src/index.js";
import type { ExecutionBuilder } from "../execution-builder.interface.js";
import { gmailDraftService } from "../../../services/gmailDraft.services.js";
import type { PendingTask } from "../../../task/task.types.js";

export class GmailExecutionBuilder
    implements ExecutionBuilder {

    supports(plan: AssistantPlan): boolean {
        return (
            plan.task.resource === "message" ||
            plan.task.resource === "messages"
        );
    }

    async build(plan: AssistantPlan, taskState: PendingTask): Promise<ExecutionPlan> {

        switch (plan.task.operation) {

            case "compose":
                const draft = await gmailDraftService.generate(plan, taskState);
                return {
                    reply: plan.reply,
                    task: plan.task,
                    execution: {
                        tool: "gmail",
                        operation: "compose",
                        payload: {
                            to: plan.task.recipientEmail!,
                            subject: draft.subject,
                            body: draft.body,
                        },
                    },
                };

            case "summarize":

                return {
                    reply: plan.reply,
                    task: plan.task,
                    execution: {
                        tool: "gmail",
                        operation: "summarize",
                        payload: {
                            timeframe: plan.task.timeframe ?? "today",
                        },
                    },
                };
            default:
                throw new Error(`Unsupported Gmail operation: ${plan.task.operation}`);
        }

    }

}