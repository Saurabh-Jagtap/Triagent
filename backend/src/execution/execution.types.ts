import type { EmailSummary } from "../schemas/email-summary.schema.js";

export type ExecutionStatus =
  | "completed"
  | "awaiting_approval"
  | "failed";

export interface ExecutionResult {
  status: ExecutionStatus;
  reply: string;
  pendingAction?: unknown;
  summary?: EmailSummary;
}