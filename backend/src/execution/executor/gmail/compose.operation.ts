import type { ExecutionPlan } from "@repo/db/src/index.js";
import { EmailService } from "../../../services/email.services.js";
import type { ExecutionResult } from "../../execution.types.js";
import type { GmailOperation } from "./operation.interface.js";

export class ComposeOperation implements GmailOperation {

    constructor(
        private readonly emailService = EmailService,
    ) { }

    supports(plan: ExecutionPlan): boolean {
        return plan.task.operation === "compose";
    }

    async execute(plan: ExecutionPlan, tenantId: string): Promise<ExecutionResult> {

        const execution = plan.execution;

        if (execution.tool !== "gmail" || execution.operation !== "compose") {
            throw new Error("Expected Gmail execution.");
        }

        await this.emailService.sendEmail({
            tenantId,
            to: execution.payload.to,
            subject: execution.payload.subject,
            body: execution.payload.body,
        });

        return {
            status: "completed",
            artifact: {
                kind: "text",
                content: `✅ Email sent successfully to ${plan.task.recipientName}.`,
            },
        };
    }
}