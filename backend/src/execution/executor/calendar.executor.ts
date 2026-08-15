import type { ExecutionPlan } from "@repo/db/src/index.js";
import type { Executor } from "../execution.interface.js";
import type { ExecutionResult } from "../execution.types.js";
import { CalendarService } from "../../services/calendar.services.js";

export class CalendarExecutor implements Executor {

    supports(plan: ExecutionPlan): boolean {
        return (
            plan.execution.tool === "calendar" &&
            plan.execution.operation === "schedule"
        );
    }

    async execute(plan: ExecutionPlan, userId: string): Promise<ExecutionResult> {

        if (plan.execution.tool !== "calendar" || plan.execution.operation !== "schedule"
        ) {
            throw new Error("Invalid calendar execution plan.");
        }

        const { title, attendees, startTime, endTime } = plan.execution.payload;

        await CalendarService.createEvent({
            tenantId: userId,
            title,
            attendees,
            startTime,
            endTime,
        });

        return {
            status: "completed",
            artifact: {
                kind: "text",
                content: `Calendar event "${title}" was scheduled successfully.`,
            },
        };
    }
}