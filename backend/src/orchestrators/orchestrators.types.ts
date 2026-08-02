import type { AssistantPlan } from "@repo/db/src/index.js";
import type { ExecutionResult } from "../execution/execution.types.js";

export type ConversationResponse =
  | {
    type: "reply";
    reply: string;
  }
  | {
    type: "plan";
    plan: AssistantPlan;
  }
  | {
    type: "execution";
    result: ExecutionResult;
  };