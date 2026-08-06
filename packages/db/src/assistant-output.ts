import type { Artifact } from "./artifacts/artifacts.js";
import { ExecutionPlan } from "./schema/executionPlan.schema.js";


export type ArtifactOutput = {
  type: "artifact";
  artifact: Artifact;
};

export type ApprovalOutput = {
  type: "approval";
  plan: ExecutionPlan;
};

export type AssistantOutput =
  | ArtifactOutput
  | ApprovalOutput;