import type { PendingTask } from "../task/task.types.js";

export function buildRouterContext(task?: PendingTask) {
    if (!task) {
        return `There is currently NO active task.`;
    }

    return `
There is an active task.

Intent:
${task.intent}

Waiting for:
${task.missing.join(", ") || "Nothing"}

Already collected:
${Object.keys(task.collected).join(", ") || "Nothing"}
`;
}