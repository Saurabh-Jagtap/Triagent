import { run } from "@openai/agents";
import { calendarDraftAgent } from "../agents/calendarDraft.agent.js";
import type { AssistantPlan, CalendarDraft } from "@repo/db";

export class CalendarDraftService {
    async generate(plan: AssistantPlan): Promise<CalendarDraft> {

        const input = {
            task: plan.task,
            reply: plan.reply,
        };

        const result = await run(
            calendarDraftAgent,
            JSON.stringify(input),
        );

        if (!result.finalOutput) {
            throw new Error("Calendar Draft Agent did not return a draft.");
        }

        return result.finalOutput;
    }
}

export const calendarDraftService = new CalendarDraftService();