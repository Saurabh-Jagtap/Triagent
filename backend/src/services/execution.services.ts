import type { ChatResponse, PendingAction } from "@repo/db/src/chat.js";
import { EmailService } from "./email.services.js";
import { CalendarService } from "./calendar.services.js";

export class ExecutionService {

    async executeAction(userId: string, action: PendingAction): Promise<ChatResponse> {
        switch (action.tool) {
            case "gmail":
                return this.executeGmailAction(userId, action);

            case "calendar":
                return this.executeCalendarAction(userId, action);

            default:
                throw new Error(`Unsupported tool`);
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

    private async executeCalendarAction(userId: string, action: Extract<PendingAction, { tool: "calendar" }>): Promise<ChatResponse> {

        await CalendarService.createEvent({
            tenantId: userId,
            title: action.payload.title,
            attendees: action.payload.attendees,
            startTime: action.payload.startTime,
            endTime: action.payload.endTime,
        });

        return {
            messages: [
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    type: "text",
                    content: `✅ Calendar event "${action.payload.title}" created successfully.`,
                },
            ],
        };
    }
}

export const executionService = new ExecutionService();