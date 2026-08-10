import type { Artifact } from "./artifacts/artifacts.js";

export type ExecutionStatus =
    | "completed"
    | "failed"
    | "awaiting_approval";

export type ExecutionResult = {
    status: ExecutionStatus;
    artifact: Artifact;

};