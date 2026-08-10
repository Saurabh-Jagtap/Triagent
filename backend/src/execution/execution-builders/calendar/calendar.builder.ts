import type { AssistantPlan, ExecutionPlan } from "@repo/db/src/index.js";
import type { ExecutionBuilder } from "../execution-builder.interface.js";

export class CalendarExecutionBuilder
    implements ExecutionBuilder {

    supports(plan: AssistantPlan): boolean {
        return (
            plan.task.resource === "meeting" &&
            plan.task.operation === "schedule"
        );
    }

    async build(plan: AssistantPlan): Promise<ExecutionPlan> {

        if (
            plan.task.operation !== "schedule" ||
            plan.task.resource !== "meeting"
        ) {
            throw new Error(`Unsupported Calendar operation: ${plan.task.operation}`);
        }

        return {
            reply: plan.reply,

            task: plan.task,

            execution: {
                tool: "calendar",
                operation: "schedule",
                payload: {
                    title: plan.task.title ?? "",
                    attendees: plan.task.attendeeEmails ?? [],
                    startTime: plan.task.startTime ?? "",
                    endTime: plan.task.endTime ?? "",
                },
            },
        };
    }
}