import type { ChatResponse, PendingAction } from "@repo/db/src/chat.js";
import { EmailService } from "./email.services.js";

export class ExecutionService {

    async executeAction(userId: string, action: PendingAction): Promise<ChatResponse> {
        switch (action.tool) {
            case "gmail":
                return this.executeGmailAction(userId, action);

            default:
                throw new Error(
                    `Unsupported tool: ${action.tool}`
                );
        }
    }

    private async executeGmailAction(userId: string, action: Extract<PendingAction, { tool: "gmail" }>): Promise<ChatResponse> {

        await EmailService.sendEmail({
            tenantId: userId,
            to: action.payload.to,
            subject: action.payload.subject,
            body: action.payload.body,
        });

        return {
            messages: [
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    type: "text",
                    content: `✅ Email sent successfully to ${action.payload.to}.`,
                },
            ],
        };
    }

}

export const executionService = new ExecutionService();