import type { ConversationResult } from "../schemas/conversation.schema.js";
import { taskStore } from "./task.store.js";

import type { PendingTask } from "./task.types.js";

export class TaskManager {

    get(userId: string) {
        return taskStore.get(userId);
    }

    create(userId: string, result: ConversationResult, originalRequest: string) {

        const task: PendingTask = {
            intent: result.intent,
            status: "collecting",
            collected: result.collected,
            missing: result.missing,
            originalRequest,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        taskStore.create(userId, task);

        return task;
    }

    update(userId: string, result: ConversationResult) {

        const existing = taskStore.get(userId);

        if (!existing) {
            throw new Error(
                "No active task."
            );
        }

        const updated: PendingTask = {

            ...existing,
            collected: {
                ...existing.collected,
                ...result.collected,
            },
            missing: result.missing,
            updatedAt: new Date(),
        };

        taskStore.update(userId, updated);

        return updated;
    }

    markPlanning(userId: string) {
        const task = taskStore.get(userId);

        if (!task) {
            throw new Error("Task not found.");
        }

        taskStore.update(userId, {
            ...task,
            status: "planning",
            updatedAt: new Date(),
        });
    }

    clear(userId: string) {
        taskStore.remove(userId);
    }

}

export const taskManager = new TaskManager();