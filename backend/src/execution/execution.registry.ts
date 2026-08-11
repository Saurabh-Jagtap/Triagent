import type { ExecutionPlan } from "@repo/db";
import type { Executor } from "./execution.interface.js";
import { CalendarExecutor } from "./executor/calendar.executor.js";
import { GmailExecutor } from "./executor/gmail.executor.js";

export class ExecutorRegistry {

    private executors = [
        new GmailExecutor(),
        new CalendarExecutor(),
    ];

    resolve(plan: ExecutionPlan): Executor {

        const executor = this.executors.find(executor => executor.supports(plan));

        if (!executor) {
            throw new Error(`No executor found for ${plan.execution.tool}`);
        }

        return executor;

    }

}