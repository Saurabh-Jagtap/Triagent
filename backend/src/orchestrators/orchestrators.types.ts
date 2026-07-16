import type { AssistantPlan } from "../schemas/assistant-plan.schema.js";

export type ConversationResponse =
  | {
      type: "reply";
      reply: string;
    }
  | {
      type: "plan";
      plan: AssistantPlan;
    };