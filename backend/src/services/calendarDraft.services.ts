import { run } from "@openai/agents";
import type { AssistantPlan, CalendarDraft } from "@repo/db/src/index.js";
import { calendarDraftAgent } from "../agents/calendarDraft.agent.js";

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