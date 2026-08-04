import type { AssistantPlan, SummaryArtifact } from "@repo/db/src/index.js";
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

        const artifact: SummaryArtifact = {
            kind: "summary",
            title: "Today's Inbox",
            content: summary.summary,
            metadata: {
                timeframe: plan.task.timeframe ?? "today",
            },
        };

        return {
            status: "completed",
            artifact,
        };

    }

}