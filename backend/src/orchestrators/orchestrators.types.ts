import type { ExecutionResult } from "../execution/execution.types.js";

export type ConversationResponse =
  | {
      type: "reply";
      reply: string;
    }
  | {
      type: "execution";
      result: ExecutionResult;
    };