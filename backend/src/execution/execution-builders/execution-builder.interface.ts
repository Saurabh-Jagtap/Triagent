import type { AssistantPlan, ExecutionPlan } from "@repo/db/src/index.js";
import type { PendingTask } from "../../task/task.types.js";

export interface ExecutionBuilder {

    supports(plan: AssistantPlan): boolean;

    build(plan: AssistantPlan, taskState: PendingTask): Promise<ExecutionPlan>;

}