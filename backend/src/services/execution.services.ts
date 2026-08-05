import { taskManager } from "../task/task.manager.js";
import type { AssistantOutput, ExecutionPlan } from "@repo/db/src/index.js";
import { executorRegistry } from "../execution/index.js";

export class ExecutionService {

    async executePlan(userId: string, plan: ExecutionPlan): Promise<AssistantOutput> {

        const executor = executorRegistry.resolve(plan);

        const result = await executor.execute(plan, userId);

        taskManager.clear(userId);

        return {
            type: "artifact",
            artifact: result.artifact,
        };


    }
}

export const executionService = new ExecutionService();