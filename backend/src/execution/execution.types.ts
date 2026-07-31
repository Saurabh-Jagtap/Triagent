export type ExecutionStatus =
  | "completed"
  | "awaiting_approval"
  | "failed";

export interface ExecutionResult {
  status: ExecutionStatus;

  reply: string;

  pendingAction?: unknown;
}