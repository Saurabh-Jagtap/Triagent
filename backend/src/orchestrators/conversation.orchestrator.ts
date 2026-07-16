import { chatService } from "../services/chat.services.js";
import { conversationService } from "../services/conversation.services.js";
import { planningService } from "../services/planning.services.js";
import { responseBuilder } from "../services/responseBuilder.services.js";
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

                return {
                    type: "reply",
                    reply: result.reply,
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

                return {
                    type: "reply",
                    reply: "Okay, I've cancelled the current task.",
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
            return { type: "reply", reply: conversation.reply };
        }

        const task = taskManager.get(userId);
        if (!task) {
            throw new Error("Task not found.");
        }

        console.log(taskManager.get(userId));
        const plan = await planningService.createPlan(task);

        taskManager.markPlanning(userId);

        return { type: "plan", plan };

    }
}

export const conversationOrchestrator = new ConversationOrchestrator();