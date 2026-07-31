import type { ChatMessage, ChatResponse } from "@repo/db/src/chat.js";
import type { AssistantPlan } from "../schemas/assistant-plan.schema.js";

export class ResponseBuilderService {
    build(plan: AssistantPlan): ChatResponse {
        const replyMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            type: "text",
            content: plan.reply,
        };


        return {
            messages: [replyMessage],
        };
    }

    buildReply(reply: string): ChatResponse {
    return {
        messages: [
            {
                id: crypto.randomUUID(),
                role: "assistant",
                type: "text",
                content: reply,
            },
        ],
    };
}
}

export const responseBuilder = new ResponseBuilderService();