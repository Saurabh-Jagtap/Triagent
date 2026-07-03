# Triagent Assistant Architecture

## Why I redesigned the assistant

Initially, the assistant architecture was extremely simple.

```
User Prompt
      │
      ▼
 OpenAI Agent
      │
      ▼
Corsair Tools
      │
      ▼
Email / Calendar
```

The LLM was responsible for:

- Understanding the request
- Deciding which tool to call
- Executing the tool
- Returning the final response

Although this worked, I discovered several problems.

---

## Problems with the original architecture

### 1. No Human Approval

Example:

> Send an email to john@example.com saying hello.

The email was sent immediately.

There was no opportunity for the user to:

- review the draft
- edit the email
- cancel the action

This was dangerous because LLMs can make mistakes.

---

### 2. Multi-tool execution failed

Prompt:

> Send an email to John and schedule a meeting tomorrow at 2 PM.

The agent often failed because it had to:

- reason
- call Gmail
- remember previous tool outputs
- call Calendar
- generate the final response

Everything happened inside one reasoning loop.

The larger the task became, the less reliable the execution became.

---

### 3. Frontend had no knowledge of pending actions

The frontend only received:

```json
{
    "answer": "Email sent successfully."
}
```

The UI could not show:

- email preview
- approval buttons
- pending actions
- execution status

because no structured information was returned.

---

## New Design Goals

The redesigned architecture had four goals.

1. Separate planning from execution.
2. Allow human approval before external actions.
3. Return structured responses instead of plain text.
4. Make it easy to add more tools in the future.

---

# Final Architecture

```
                    User
                      │
                      ▼
            Assistant Controller
                      │
                      ▼
             AssistantService
               /            \
              /              \
             ▼                ▼
     PlanningService   ExecutionService
             │                │
             ▼                ▼
      plannerAgent     assistantAgent
       (No Tools)      (Corsair Tools)
```

The key idea:

The planner **never executes anything.**

The executor **never plans anything.**

Each component has only one responsibility.

---

# Request Lifecycle

## Step 1

The frontend sends the user message.

```
POST /assistant/chat
```

Example:

```
Send an email to john@example.com saying hello.
```

---

## Step 2

AssistantService receives the request.

Instead of calling the execution agent directly, it delegates planning.

```
AssistantService
        │
        ▼
PlanningService
```

---

## Step 3

PlanningService calls plannerAgent.

plannerAgent has:

- no Gmail tools
- no Calendar tools
- no Corsair

Its only responsibility is understanding user intent.

---

## Step 4

plannerAgent returns an AssistantPlan.

Example:

```json
{
    "reply": "I've prepared an email draft for your review.",
    "actions": [
        {
            "tool": "gmail",
            "payload": {
                "to": "john@example.com",
                "subject": "Hello",
                "body": "hello"
            }
        }
    ]
}
```

---

## Step 5

PlanningService validates the response.

```
JSON.parse()

↓

AssistantPlanSchema.parse()
```

This guarantees that malformed LLM responses fail immediately.

---

## Step 6

ResponseBuilder converts the AssistantPlan into ChatResponse.

```
AssistantPlan

↓

ChatResponse
```

This layer contains no AI code.

It only maps one object into another.

---

## Step 7

The frontend renders the response.

The response may contain:

- text messages
- pending actions

Example:

```
Assistant

↓

"I've prepared an email draft."

↓

Action Card

↓

Approve / Cancel
```

At this point **nothing has been executed yet.**

---

# Execution Lifecycle (Next Phase)

Once the user clicks Approve:

```
Approve Button
        │
        ▼
POST /assistant/execute
        │
        ▼
ExecutionService
        │
        ▼
assistantAgent
        │
        ▼
Corsair
        │
        ▼
Gmail / Calendar
```

Only the execution agent has access to tools.

---

# Backend Responsibilities

## plannerAgent

Responsible for:

- understanding intent
- extracting structured data
- creating execution plans

Not responsible for:

- Gmail
- Calendar
- external actions

---

## PlanningService

Responsible for:

- running plannerAgent
- parsing JSON
- schema validation

---

## ResponseBuilder

Responsible for:

```
AssistantPlan

↓

ChatResponse
```

No OpenAI logic.

No HTTP logic.

No business logic.

---

## ExecutionService

Responsible for:

- executing approved actions
- calling assistantAgent
- returning execution results

---

## assistantAgent

Responsible only for:

- Gmail
- Calendar
- Corsair
- tool execution

It no longer decides whether an action should happen.

---

# Frontend Responsibilities

The frontend never understands AI.

It only renders ChatResponse.

Possible message types:

- text
- pending_action

This makes the UI independent from OpenAI.

---

# Biggest Challenges

## Challenge 1

Planning and execution were initially combined.

The assistant executed actions immediately after understanding the prompt.

This made:

- editing
- approvals
- retries

very difficult.

Solution:

Split the architecture into two phases.

Planning first.

Execution later.

---

## Challenge 2

The OpenAI Agents SDK did not support structured outputs the way I initially expected.

Originally I tried using:

```
outputType
```

The SDK version I was using did not support it.

Solution:

The planner now returns JSON.

The backend validates it using Zod.

```
JSON.parse()

↓

AssistantPlanSchema.parse()
```

---

## Challenge 3

Designing a stable frontend/backend contract.

Initially the frontend expected only:

```
answer
```

Eventually a common response format was introduced:

```
ChatResponse
```

Every backend response now follows the same structure.

---

## Challenge 4

Separating responsibilities.

Previously:

assistantAgent

- planned
- executed
- responded

Now:

plannerAgent

↓

PlanningService

↓

ResponseBuilder

↓

ExecutionService

↓

assistantAgent

Each component has one responsibility.

---

# Biggest Bug Solved

One of the biggest architectural bugs was allowing the LLM to execute tools immediately.

Example:

```
Send an email to John.
```

Old behaviour:

```
LLM

↓

Email Sent
```

There was no opportunity to review the email.

New behaviour:

```
LLM

↓

Execution Plan

↓

Approval Card

↓

User Approves

↓

Email Sent
```

This introduced human-in-the-loop execution.

---

# Lessons Learned

1. LLMs should not own the entire application.

2. Planning and execution are different responsibilities.

3. Structured contracts are easier to maintain than plain text responses.

4. Validation should happen immediately after the LLM returns output.

5. The frontend should render structured messages instead of interpreting AI output.

6. Human approval dramatically improves safety and user experience.

7. Good architecture makes adding future tools much easier.