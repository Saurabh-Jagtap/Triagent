import type { ChatResponse } from "@repo/db/src/chat.js"
import { conversationOrchestrator } from "../orchestrators/conversation.orchestrator.js";
import { responseBuilder } from "./responseBuilder.services.js";

export class AssistantService {
    async chat(userId: string, userMessage: string): Promise<ChatResponse> {

         const result =
            await conversationOrchestrator.handleMessage(
                userId,
                userMessage,
            );

        switch (result.type) {

            case "reply":
                return responseBuilder.buildReply(
                    result.reply,
                );

            case "plan":
                return responseBuilder.buildPlan(
                    result.plan,
                );

            case "execution":
                return responseBuilder.buildExecutionResult(
                    result.result,
                );

        }

    }
}

export const assistantService = new AssistantService();