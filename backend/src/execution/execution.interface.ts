import type { AssistantPlan } from "../schemas/assistant-plan.schema.js";
import type { ExecutionResult } from "./execution.types.js";

export interface Executor {
  supports(plan: AssistantPlan): boolean;

  execute(plan: AssistantPlan): Promise<ExecutionResult>;
}