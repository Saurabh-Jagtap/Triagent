import type { ChatResponse } from "@repo/db/src/chat.js"
import { conversationOrchestrator } from "../orchestrators/conversation.orchestrator.js";
import { responseBuilder } from "./responseBuilder.services.js";

export class AssistantService {
    async chat(userId: string, userMessage: string): Promise<ChatResponse> {

        const result = await conversationOrchestrator.handleMessage(userId, userMessage);

        if (result.type === "reply") {
            return responseBuilder.buildReply(
                result.reply,
            );

        }

        return responseBuilder.build(result.plan);

    }
}

export const assistantService = new AssistantService();