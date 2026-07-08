import type { ChatResponse } from "@repo/db/src/chat.js"
import { planningService } from "./planning.services.js";
import { responseBuilder } from "./responseBuilder.services.js";

export class AssistantService {
    async chat(userId: string, userMessage: string): Promise<ChatResponse> {

        const plan = await planningService.createPlan(userMessage);
        return responseBuilder.build(plan);
    }
}

export const assistantService = new AssistantService();