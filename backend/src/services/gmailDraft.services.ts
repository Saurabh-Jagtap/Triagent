import { run } from "@openai/agents";
import type { AssistantPlan, GmailDraft } from "@repo/db/src/index.js";
import { gmailDraftAgent } from "../agents/gmailDraft.agent.js";

export class GmailDraftService {
    async generate(plan: AssistantPlan): Promise<GmailDraft> {

        const input = {
            task: plan.task,
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

export const gmailDraftService =
    new GmailDraftService();