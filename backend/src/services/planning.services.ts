import { run } from "@openai/agents";
import { plannerAgent } from "../agents/planner.agent.js";

import {
  AssistantPlanSchema,
  type AssistantPlan,
} from "../schemas/assistant-plan.schema.js";
import { buildPlannerContext } from "../utils/planner-context.js";

export class PlanningService {

  async createPlan(prompt: string): Promise<AssistantPlan> {

    const plannerPrompt = `
${buildPlannerContext()}

User Request:
${prompt}
`;

    const result = await run(
      plannerAgent,
      plannerPrompt
    );

    if (!result.finalOutput) {
      throw new Error("Planner returned no output.");
    }

    const json = JSON.parse(result.finalOutput);

    return AssistantPlanSchema.parse(json);
  }

}

export const planningService = new PlanningService();