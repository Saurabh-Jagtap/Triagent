import { z } from "zod";

export const GmailDraftSchema = z.object({
    subject: z.string(),
    body: z.string(),
});

export type GmailDraft = z.infer<typeof GmailDraftSchema>;