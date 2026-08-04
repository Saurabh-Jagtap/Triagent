import type { Artifact } from "./artifacts/artifacts.js";
import type { AssistantPlan } from "./schema/index.js";

export type ArtifactOutput = {
  type: "artifact";
  artifact: Artifact;
};

export type ApprovalOutput = {
  type: "approval";
  plan: AssistantPlan;
};

export type AssistantOutput =
  | ArtifactOutput
  | ApprovalOutput;