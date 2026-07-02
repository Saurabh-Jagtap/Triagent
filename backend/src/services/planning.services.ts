import { run } from "@openai/agents";
import { plannerAgent } from "../agents/planner.agent.js";

import {
  AssistantPlanSchema,
  type AssistantPlan,
} from "../schemas/assistant-plan.schema.js";

export class PlanningService {

  async createPlan(
    prompt: string
  ): Promise<AssistantPlan> {

    const result = await run(
      plannerAgent,
      prompt
    );

    if (!result.finalOutput) {
      throw new Error("Planner returned no output.");
    }

    console.log(result.finalOutput); 
    const json = JSON.parse(result.finalOutput);

    return AssistantPlanSchema.parse(json);
  }

}

export const planningService = new PlanningService();