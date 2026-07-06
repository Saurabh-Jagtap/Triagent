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

        const actionMessages: ChatMessage[] = plan.actions.map(action => {

            switch (action.tool) {

                case "gmail":
                    return {
                        id: crypto.randomUUID(),
                        role: "assistant" as const,
                        type: "pending_action" as const,
                        pendingAction: {
                            id: crypto.randomUUID(),
                            tool: "gmail" as const,
                            status: "pending" as const,
                            payload: action.payload,
                            requiresApproval: true,
                        },
                    };

                case "calendar":
                    return {
                        id: crypto.randomUUID(),
                        role: "assistant" as const,
                        type: "pending_action" as const,
                        pendingAction: {
                            id: crypto.randomUUID(),
                            tool: "calendar" as const,
                            status: "pending" as const,
                            payload: action.payload,
                            requiresApproval: true,
                        },
                    };

            }

        })

        return {
            messages: [
                textMessage,
                ...actionMessages,
            ],
        };
    }
}

export const responseBuilder = new ResponseBuilderService();