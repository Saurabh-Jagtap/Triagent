export interface EmailSummaryMessage {
    id: string;
    from: string;
    subject: string;
    snippet: string;
    receivedAt: Date;
}