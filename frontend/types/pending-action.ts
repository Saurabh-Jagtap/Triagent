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
        status: "pending" | "approved" | "cancelled" | "completed";
        payload: GmailPayload;
    }
    | {
        id: string;
        tool: "calendar";
        status: "pending" | "approved" | "cancelled" | "completed";
        payload: CalendarPayload;
    };

export type ChatMessage = {
    id: string;
    role: "user" | "assistant" | "system";
    type: "text" | "pending_action"
    content?: string;
    pendingAction?: PendingAction;
};
