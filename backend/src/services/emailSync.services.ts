import { corsair } from "../corsair.js";
import { db, emails } from "@repo/db";

type SyncedEmail = {
    tenantId: string;
    gmailMessageId: string;
    gmailThreadId: string;
    subject: string;
    from: string;
    to: string[];
    snippet: string;
    body?: string | null;
    labels: string[];
    isRead: boolean;
    historyId?: string;
    receivedAt: Date;
};

function getHeader(headers: { name: string; value: string }[], name: string) {
    return headers.find((h) => h.name === name)?.value;
}

export class EmailSyncService {
    static async syncInbox(userId: string) {

        const tenant = corsair.withTenant(userId);
        const { threads } = await tenant.gmail.api.threads.list();

        let synced = 0;

        for (const thread of threads) {
            const details = await tenant.gmail.api.threads.get({ id: thread.id, });
            const latestMessage = details.messages?.[details.messages.length - 1];

            if (!latestMessage) {
                continue;
            }

            const headers = latestMessage.payload?.headers ?? [];
            const to = (getHeader(headers, "To") ?? "").split(",").map(email => email.trim()).filter(Boolean);

            const email = {
                tenantId: userId,

                gmailThreadId: thread.id,
                gmailMessageId: latestMessage.id,

                subject: getHeader(headers, "Subject") ?? "No Subject",
                from: getHeader(headers, "From") ?? "Unknown Sender",
                to: to,
                snippet: latestMessage.snippet ?? details.snippet ?? "",

                labels: latestMessage.labelIds ?? [],
                isRead: !(latestMessage.labelIds ?? []).includes("UNREAD"),
                historyId: latestMessage.historyId ?? details.historyId,
                receivedAt: new Date(getHeader(headers, "Date") ?? Date.now()),

            };

            await this.upsertEmail(email);
            synced++;
        }
        return synced;
    }

    private static async upsertEmail(email: SyncedEmail) {
        const result = await db
            .insert(emails)
            .values(email)
            .onConflictDoUpdate({
                target: emails.gmailThreadId,

                set: {
                    gmailMessageId: email.gmailMessageId,
                    subject: email.subject,
                    from: email.from,
                    to: email.to,
                    snippet: email.snippet,
                    labels: email.labels,
                    isRead: email.isRead,
                    historyId: email.historyId,
                    receivedAt: email.receivedAt,
                    updatedAt: new Date(),
                },
            });

            return result;
    }
}
