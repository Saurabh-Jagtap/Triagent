import { run } from "@openai/agents";
import { conversationAgent } from "../agents/conversation.agent.js";
import { ConversationResultSchema, type ConversationResult } from "../schemas/conversation.schema.js";

type ConversationContext = {
    currentTask?: unknown;
};

export class ConversationService {
    async continueConversation(message: string, context: ConversationContext = {}): Promise<ConversationResult> {
        const input = `Current Task: ${JSON.stringify(context.currentTask ?? null, null, 2)}
    Latest User Message: ${message}`;

        const result = await run(
            conversationAgent,
            input
        );

        if (!result.finalOutput) {
            throw new Error(
                "Conversation agent returned no output."
            );
        }

        return ConversationResultSchema.parse(result.finalOutput);
    }
}

export const conversationService = new ConversationService();