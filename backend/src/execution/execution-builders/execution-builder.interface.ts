import type { AssistantPlan, ExecutionPlan } from "@repo/db/src/index.js";

export interface ExecutionBuilder {

    supports(plan: AssistantPlan): boolean;

    build(plan: AssistantPlan): Promise<ExecutionPlan>;

}