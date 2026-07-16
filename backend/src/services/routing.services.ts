import { run } from "@openai/agents";
import { routerAgent } from "../agents/router.agent.js";
import type { PendingTask } from "../task/task.types.js";
import type { RouterResult } from "../schemas/router.schema.js";
import { buildRouterContext } from "../utils/router-context.js";

export class RoutingService {

    async route(message: string, currentTask?: PendingTask): Promise<RouterResult> {

        const routerPrompt = `
${buildRouterContext(currentTask)}

Latest User Message:
${message}
`;

        const result = await run(
            routerAgent,
            routerPrompt,
        );

        if (!result.finalOutput) {
            throw new Error("Router returned no output.");
        }

        return result.finalOutput;
    }

}

export const routingService = new RoutingService();