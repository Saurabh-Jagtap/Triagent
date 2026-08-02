import type { ChatResponse } from "@repo/db/src/chat.js";
import type { ExecutionResult } from "../execution/execution.types.js";
import type { AssistantPlan } from "@repo/db/src/index.js";

export class ResponseBuilderService {
    buildExecutionResult(result: ExecutionResult): ChatResponse {

        return {
            messages: [
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    type: "text",
                    content: result.reply,
                },
            ],
        };

    }

    buildReply(reply: string): ChatResponse {
        return {
            messages: [
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    type: "text",
                    content: reply,
                },
            ],
        };
    }

    buildPlan(plan: AssistantPlan): ChatResponse {
    return {
        messages: [
            {
                id: crypto.randomUUID(),
                role: "assistant",
                type: "approval",
                plan,
            },
        ],
    };
}
}

export const responseBuilder = new ResponseBuilderService();