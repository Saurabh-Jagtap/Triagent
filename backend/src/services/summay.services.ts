import { run } from "@openai/agents";

import { summaryAgent } from "../agents/summary.agent.js";
import type { EmailSummaryMessage } from "../types/email.types.js";
import type { EmailSummary } from "../schemas/emailSummary.schema.js";

export class SummaryService {

    async summarize(emails: EmailSummaryMessage[]): Promise<EmailSummary> {

        const prompt = `
Summarize the following emails.

${JSON.stringify(emails, null, 2)}
`;

        const result = await run(
            summaryAgent,
            prompt
        );

        if (!result.finalOutput) {
            throw new Error("Summary agent returned no output.");
        }

        return result.finalOutput;

    }

}

export const summaryService = new SummaryService();