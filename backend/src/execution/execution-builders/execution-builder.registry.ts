import type { AssistantPlan } from "@repo/db/src/index.js";
import type { ExecutionBuilder } from "./execution-builder.interface.js";
import { GmailExecutionBuilder } from "./gmail/gmail.builder.js";

export class ExecutionBuilderRegistry {

  private builders: ExecutionBuilder[] = [
    new GmailExecutionBuilder(),
  ];

  register(builder: ExecutionBuilder) {
    this.builders.push(builder);
  }

  resolve(plan: AssistantPlan): ExecutionBuilder {

    const builder = this.builders.find(
      builder => builder.supports(plan)
    );

    if (!builder) {
      throw new Error(`No execution builder found.`);
    }

    return builder;

  }

}