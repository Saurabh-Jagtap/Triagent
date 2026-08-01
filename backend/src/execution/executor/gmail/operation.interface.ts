import type { AssistantPlan } from "../../../schemas/assistant-plan.schema.js";
import type { ExecutionResult } from "../../execution.types.js";

export interface GmailOperation {

    supports(plan: AssistantPlan): boolean;

    execute(plan: AssistantPlan, tenantId: string): Promise<ExecutionResult>;

}