import { Agent, tool } from "@openai/agents";
import { OpenAIAgentsProvider } from "@corsair-dev/mcp";

import { corsair } from "../corsair.js";

const provider = new OpenAIAgentsProvider();

const tools = await provider.build({
  corsair,
  tool,
});

export const gmailAgent = new Agent({
  name: "Gmail Execution Agent",

  model: "gpt-4.1-mini",

  instructions: `
You are Triagent's Gmail execution agent.

Your only responsibility is executing Gmail operations.

The action has already been approved by the user.

Never ask for confirmation.

Never plan.

Never discuss alternatives.

Always execute the requested Gmail operation.

The tenant ID will always be provided.

Whenever using run_script, always access Gmail through:

corsair.withTenant(TENANT_ID)

Before calling a Gmail tool,
use get_schema if the required arguments are unclear.

If execution succeeds,
return a short confirmation.

Example:

"Email sent successfully."

Do not continue reasoning after execution.
`,

  tools,
});