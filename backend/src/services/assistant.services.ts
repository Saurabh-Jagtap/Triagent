import type { ChatResponse } from "@repo/db/src/chat.js"
import { conversationOrchestrator } from "../orchestrators/conversation.orchestrator.js";
import { responseBuilder } from "./responseBuilder.services.js";

export class AssistantService {
    async chat(userId: string, userMessage: string): Promise<ChatResponse> {

        const output = await conversationOrchestrator.handleMessage(userId, userMessage);

        return responseBuilder.build(output);

    }
}

export const assistantService = new AssistantService();