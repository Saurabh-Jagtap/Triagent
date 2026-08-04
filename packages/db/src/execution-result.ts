import { Artifact } from "./artifacts/artifacts";

export type ExecutionStatus =
    | "completed"
    | "failed"
    | "awaiting_approval";

export type ExecutionResult = {
    status: ExecutionStatus;
    artifact: Artifact;

};