import type { PendingTask } from "./task.types.js";

export class TaskStore {

    private readonly tasks = new Map<string, PendingTask>();

    get(userId: string) {
        return this.tasks.get(userId);
    }

    create(userId: string, task: PendingTask) {
        this.tasks.set(userId, task);
    }

    update(userId: string, task: PendingTask) {
        this.tasks.set(userId, task);
    }

    remove(userId: string) {
        this.tasks.delete(userId);
    }

    has(userId: string) {
        return this.tasks.has(userId);
    }
}

export const taskStore = new TaskStore();
