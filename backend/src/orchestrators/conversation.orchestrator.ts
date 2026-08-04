import type { TextArtifact } from "@repo/db/src/index.js";
import { executorRegistry } from "../execution/index.js";
import { chatService } from "../services/chat.services.js";
import { conversationService } from "../services/conversation.services.js";
import { planningService } from "../services/planning.services.js";
import { routingService } from "../services/routing.services.js";
import { taskManager } from "../task/task.manager.js";
import type { ConversationResponse } from "./orchestrators.types.js";


export class ConversationOrchestrator {

    async handleMessage(userId: string, message: string): Promise<ConversationResponse> {
        const currentTask = taskManager.get(userId);

        const route = await routingService.route(message, currentTask);

        console.log("Router:", route);

        let conversation;

        switch (route.route) {

            case "chat": {
                const result = await chatService.chat(message);

                const artifact: TextArtifact = {
                    kind: "text",
                    content: result.reply,
                };

                return {
                    type: "artifact",
                    artifact,
                };

            }

            case "new_task":
                conversation = await conversationService.continueConversation(
                    message,
                    { currentTask: undefined }
                );
                break;

            case "continue_task":
                conversation = await conversationService.continueConversation(
                    message,
                    { currentTask }
                );
                break;

            case "cancel_task": {

                if (currentTask) {
                    taskManager.clear(userId);
                }

                const artifact: TextArtifact = {
                    kind: "text",
                    content: "Okay, I've cancelled the current task.",
                };

                return {
                    type: "artifact",
                    artifact,
                };
            }

            default:
                throw new Error("Route not implemented yet.");
        }

        console.log(
            JSON.stringify(conversation, null, 2)
        );

        if (!currentTask) {
            taskManager.create(userId, conversation, message);
        }
        else {
            taskManager.update(userId, conversation);
        }

        const hasMissingFields = conversation.missing.length > 0;

        if (hasMissingFields) {
            const artifact: TextArtifact = {
                kind: "text",
                content: conversation.reply,
            };

            return {
                type: "artifact",
                artifact,
            };
        }

        const task = taskManager.get(userId);
        if (!task) {
            throw new Error("Task not found.");
        }

        console.log(taskManager.get(userId));

        const plan = await planningService.createPlan(task);

        taskManager.markPlanning(userId);

        if (plan.approvalRequired) {
            return {
                type: "approval",
                plan,
            };
        }

        const executor = executorRegistry.resolve(plan);

        const executionResult = await executor.execute(plan, userId);

        taskManager.clear(userId);

        return {
            type: "artifact",
            artifact: executionResult.artifact,
        };

    }
}

export const conversationOrchestrator = new ConversationOrchestrator();