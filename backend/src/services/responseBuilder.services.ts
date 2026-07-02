import type { ChatMessage, ChatResponse } from "@repo/db/src/chat.js";
import type { AssistantPlan } from "../schemas/assistant-plan.schema.js";

export class ResponseBuilderService {
    build(plan: AssistantPlan): ChatResponse {
        const textMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            type: "text",
            content: plan.reply,
        };

        const actionMessages: ChatMessage[] = plan.actions.map(
            (action): ChatMessage => ({
                id: crypto.randomUUID(),
                role: "assistant",
                type: "pending_action",
                pendingAction: {
                    id: crypto.randomUUID(),
                    tool: action.tool,
                    status: "pending",
                    payload: action.payload,
                    requiresApproval: true,
                },
            })
        );

        return {
            messages: [
                textMessage,
                ...actionMessages,
            ],
        };
    }
}

export const responseBuilder = new ResponseBuilderService();