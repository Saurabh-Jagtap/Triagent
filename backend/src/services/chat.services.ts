import { run } from "@openai/agents";
import { chatAgent } from "../agents/chat.agent.js";
import type { ChatResult } from "../schemas/chat.schema.js";

export class ChatService {

    async chat(message: string): Promise<ChatResult> {

        const result = await run(
            chatAgent,
            message,
        );

        if (!result.finalOutput) {
            throw new Error("Chat agent returned no output.");
        }

        return result.finalOutput;
    }

}

export const chatService = new ChatService();