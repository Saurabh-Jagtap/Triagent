import type { AssistantPlan } from "@repo/db/src/index.js";
import { EmailService } from "../../../services/email.services.js";
import type { ExecutionResult } from "../../execution.types.js";
import type { GmailOperation } from "./operation.interface.js";

export class ComposeOperation implements GmailOperation {

    constructor(
        private readonly emailService = EmailService,
    ) {}

    supports(plan: AssistantPlan): boolean {
        return plan.task.operation === "compose";
    }

    async execute(
        plan: AssistantPlan,
        tenantId: string,
    ): Promise<ExecutionResult> {

        await this.emailService.sendEmail({
            tenantId,
            to: plan.task.recipientEmail!,
            subject: plan.task.subject!,
            body: plan.task.body!,
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