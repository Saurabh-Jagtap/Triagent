import type { ExecutionPlan } from "@repo/db/src/index.js";
import type { ExecutionResult } from "./execution.types.js";

export interface Executor {
  supports(plan: ExecutionPlan): boolean;

  execute(plan: ExecutionPlan, tenantId: string): Promise<ExecutionResult>;
}