import type { SummaryArtifact } from "./artifacts/artifacts";
import type { AssistantPlan } from "./schema";

export type ChatMessage =
  | {
      id: string;
      role: "user" | "assistant" | "system";
      type: "text";
      content: string;
    }
  | {
      id: string;
      role: "assistant";
      type: "summary";
      summary: SummaryArtifact;
    }
  | {
      id: string;
      role: "assistant";
      type: "approval";
      plan: AssistantPlan;
    };

export type TextMessage = Extract<
  ChatMessage,
  { type: "text" }
>;

export type SummaryMessage = Extract<
  ChatMessage,
  { type: "summary" }
>;

export type ApprovalMessage = Extract<
  ChatMessage,
  { type: "approval" }
>;

export type ChatResponse = {
  messages: ChatMessage[];
};