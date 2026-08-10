import { run } from "@openai/agents";
import { plannerAgent } from "../agents/planner.agent.js";
import { buildPlannerContext } from "../utils/plannerContext.js";
import type { PendingTask } from "../task/task.types.js";
import type { AssistantPlan } from "@repo/db/src/index.js";

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
      goal: task.goal,
      domain: task.domain,
      missing: task.missing,
    }, null, 2)}
`;

    const result = await run(
      plannerAgent,
      plannerPrompt
    );

    console.dir(result.finalOutput, { depth: null });

    if (!result.finalOutput) {
      throw new Error("Planner returned no output.");
    }

    return result.finalOutput;
  }

}

export const planningService = new PlanningService();