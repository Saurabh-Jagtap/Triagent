import { run } from "@openai/agents";
import type { AssistantPlan, GmailDraft } from "@repo/db/src/index.js";
import { gmailDraftAgent } from "../agents/gmailDraft.agent.js";
import type { PendingTask } from "../task/task.types.js";

export class GmailDraftService {
    async generate(plan: AssistantPlan, taskState: PendingTask): Promise<GmailDraft> {

        const input = {
            originalRequest: taskState.originalRequest,
            reply: plan.reply,
        };

        const result = await run(
            gmailDraftAgent,
            JSON.stringify(input),
        );

        if (!result.finalOutput) {
            throw new Error("Gmail Draft Agent did not return a draft.");
        }

        return result.finalOutput;
    }
}

export const gmailDraftService = new GmailDraftService();