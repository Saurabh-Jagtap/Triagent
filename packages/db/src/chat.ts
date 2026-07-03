export type ActionStatus =
  | "pending"
  | "approved"
  | "cancelled"
  | "failed"
  | "completed";

export type GmailPayload = {
  to: string;
  subject: string;
  body: string;
};

export type CalendarPayload = {
  title: string;
  attendees: string[];
  startTime: string;
  endTime: string;
};

export type PendingAction =
  | {
      id: string;
      tool: "gmail";
      status: ActionStatus;
      payload: GmailPayload;
      requiresApproval?: boolean;
    }
  | {
      id: string;
      tool: "calendar";
      status: ActionStatus;
      payload: CalendarPayload;
      requiresApproval?: boolean;
    };

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
      type: "pending_action";
      pendingAction: PendingAction;
    };

export type TextMessage = Extract<
  ChatMessage,
  { type: "text" }
>;

export type PendingActionMessage = Extract<
  ChatMessage,
  { type: "pending_action" }
>;

export type ChatResponse = {messages: ChatMessage[]};