import type { ConversationResult } from "../schemas/conversation.schema.js";

export type CollectedData = ConversationResult["collected"];

export type TaskIntent =
    | "gmail"
    | "calendar";

export type TaskStatus =
    | "collecting"
    | "planning"
    | "approval"
    | "completed";

export interface PendingTask {
    intent: TaskIntent;
    status: TaskStatus;
    collected: CollectedData;
    missing: ConversationResult["missing"];
    originalRequest: string;
    createdAt: Date;
    updatedAt: Date;
}