import { run } from "@openai/agents";
import { assistantAgent } from "../agents/assistant.agent.js";

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

        return result;
    }
}

export const assistantService = new AssistantService();