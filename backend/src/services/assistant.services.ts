import { run } from "@openai/agents";
import { assistantAgent } from "../agents/assistant.agent.js";
import type { ChatResponse } from "@repo/db/src/chat.js"

export class AssistantService {
    async chat(
        userId: string,
        userMessage: string
    ) {
        const result = await run(
            assistantAgent,
            `
TENANT_ID=${userId}

${userMessage}
`,
            {
                maxTurns: 10,
            }
        );

        return {
            messages: [
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    type: "text",
                    content: result.finalOutput ?? ""
                }
            ]
        };
    }
}

export const assistantService = new AssistantService();