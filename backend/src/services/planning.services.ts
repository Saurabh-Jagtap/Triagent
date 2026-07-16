import { run } from "@openai/agents";
import { plannerAgent } from "../agents/planner.agent.js";

import { type AssistantPlan } from "../schemas/assistant-plan.schema.js";
import { buildPlannerContext } from "../utils/planner-context.js";
import type { PendingTask } from "../task/task.types.js";

export class PlanningService {

  async createPlan(task: PendingTask): Promise<AssistantPlan> {

    const plannerPrompt = `
${buildPlannerContext()}

Original User Request:

${task.originalRequest}

Collected Information:

${JSON.stringify(task.collected, null, 2)}

Current Task State:

${JSON.stringify({
      intent: task.intent,
      missing: task.missing,
    }, null, 2)}
`;

    const result = await run(
      plannerAgent,
      plannerPrompt
    );

    if (!result.finalOutput) {
      throw new Error("Planner returned no output.");
    }

    return result.finalOutput;
  }

}

export const planningService = new PlanningService();