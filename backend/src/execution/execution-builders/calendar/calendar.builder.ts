import type { ExecutionBuilder } from "../execution-builder.interface.js";
import type { PendingTask } from "../../../task/task.types.js";
import { UserService } from "../../../services/user.services.js";
import { normalizeEndTime, normalizeStartTime } from "../../../utils/time.utils.js";
import { calendarDraftService } from "../../../services/calendarDraft.services.js";
import type { AssistantPlan, ExecutionPlan } from "@repo/db";

export class CalendarExecutionBuilder
    implements ExecutionBuilder {

    supports(plan: AssistantPlan): boolean {
        return (
            plan.task.resource === "meeting" &&
            plan.task.operation === "schedule"
        );
    }

    async build(plan: AssistantPlan, taskState: PendingTask, userId: string): Promise<ExecutionPlan> {

        if (plan.task.operation !== "schedule" || plan.task.resource !== "meeting") {
            throw new Error(`Unsupported Calendar operation: ${plan.task.operation}`);
        }

        const user = await UserService.getMe(userId);
        const timezone = user.timezone;

        const startTime = normalizeStartTime(
            taskState.collected.startTime!,
            timezone,
        );

        const endTime = normalizeEndTime(
            startTime,
            taskState.collected.endTime,
            taskState.collected.durationMinutes,
            timezone,
        );

        console.log("CALENDAR TIME DEBUG");
        console.log("User timezone:", timezone);
        console.log("Raw startTime:", taskState.collected.startTime);
        console.log("Normalized startTime:", startTime);

        const draft = await calendarDraftService.generate(plan);

        return {
            reply: plan.reply,
            task: plan.task,
            execution: {
                tool: "calendar",
                operation: "schedule",
                payload: {
                    title: draft.title,
                    attendees: plan.task.attendeeEmails ?? [],
                    startTime,
                    endTime,
                },
            },
        };
    }
}