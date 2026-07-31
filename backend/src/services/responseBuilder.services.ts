import type { ChatResponse } from "@repo/db/src/chat.js";
import type { ExecutionResult } from "../execution/execution.types.js";

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
}

export const responseBuilder = new ResponseBuilderService();