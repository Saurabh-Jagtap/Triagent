import type { ConversationResult } from "../schemas/conversation.schema.js";

type CollectedData = ConversationResult["collected"];

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
    collected: CollectedData
    missing: string[];
    originalRequest: string
    createdAt: Date;
    updatedAt: Date;
}