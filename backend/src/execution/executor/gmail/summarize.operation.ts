import type { AssistantPlan } from "../../../schemas/assistant-plan.schema.js";
import { EmailService } from "../../../services/email.services.js";
import { summaryService } from "../../../services/summay.services.js";
import type { ExecutionResult } from "../../execution.types.js";
import type { GmailOperation } from "./operation.interface.js";

export class SummarizeOperation implements GmailOperation {

    constructor(private readonly emailService = EmailService) { }

    supports(plan: AssistantPlan): boolean {

        return plan.task.operation === "summarize";

    }

    async execute(plan: AssistantPlan, tenantId: string): Promise<ExecutionResult> {

        const timeframe = (plan.task.timeframe as
            | "today"
            | "yesterday"
            | "week") ?? "today";

        const emails = await this.emailService.getMessagesForSummary(tenantId, timeframe);

        const summary = await summaryService.summarize(emails);

        return {
            status: "completed",
            reply: summary.summary,
            summary,
        };

    }

}