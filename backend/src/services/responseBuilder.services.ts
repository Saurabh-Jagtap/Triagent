import type { ChatMessage, ChatResponse } from "@repo/db/src/chat.js";
import type { Artifact, AssistantOutput, ListArtifact, SummaryArtifact, TextArtifact, TimelineArtifact } from "@repo/db/src/index.js";

export class ResponseBuilderService {

    private buildArtifact(artifact: Artifact): ChatMessage {

        switch (artifact.kind) {
            case "text":
                return this.buildTextArtifact(
                    artifact,
                );

            case "summary":
                return this.buildSummaryArtifact(
                    artifact,
                );

            case "list":
                return this.buildListArtifact(
                    artifact,
                );

            case "timeline":
                return this.buildTimelineArtifact(
                    artifact,
                );

            default: {
                const _exhaustive: never = artifact;
                throw new Error(`Unsupported artifact: ${JSON.stringify(_exhaustive)}`);
            }
        }

    }

    build(output: AssistantOutput): ChatResponse {

        switch (output.type) {

            case "artifact":
                return {
                    messages: [
                        this.buildArtifact(
                            output.artifact,
                        ),
                    ],
                };

            case "approval":
                return {
                    messages: [
                        {
                            id: crypto.randomUUID(),
                            role: "assistant",
                            type: "approval",
                            plan: output.plan,
                        },
                    ],
                };

        }

    }

    private buildSummaryArtifact(artifact: SummaryArtifact): ChatMessage {

        return {
            id: crypto.randomUUID(),
            role: "assistant",
            type: "summary",
            summary: artifact,
        };

    }

    private buildTextArtifact(artifact: TextArtifact): ChatMessage {

        return {
            id: crypto.randomUUID(),
            role: "assistant",
            type: "text",
            content: artifact.content,
        };

    }

    private buildListArtifact(
        artifact: ListArtifact,
    ): ChatMessage {
        throw new Error("List artifact not implemented.");
    }

    private buildTimelineArtifact(
        artifact: TimelineArtifact,
    ): ChatMessage {
        throw new Error("Timeline artifact not implemented.");
    }

}

export const responseBuilder = new ResponseBuilderService();