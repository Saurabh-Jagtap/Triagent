export type TextArtifact = {
    kind: "text";
    content: string;
};

export type SummaryArtifact = {
    kind: "summary";
    title: string;
    content: string;
    metadata?: Record<string, unknown>;
}

export type ApprovalArtifact = {
    kind: "approval";
    plan: import("../schema/assistantPlan.schema.js").AssistantPlan;
};

export type ListArtifact = {
    kind: "list";
    title: string;
    items: unknown[];
};

export type TimelineArtifact = {
    kind: "timeline";
    title: string;
    events: unknown[];
};

export type Artifact =
    | TextArtifact
    | SummaryArtifact
    | ListArtifact
    | TimelineArtifact;