# Triagent v2 Assistant Architecture

## Overview

The goal of Triagent is **not** to become a wrapper around Gmail or Google Calendar APIs. Its goal is to function as an AI Executive Assistant that understands the user's intent, reasons about the task, and then uses the appropriate tools to fulfill it.

The architecture should mirror how a human assistant thinks:

1. Understand what the user wants.
2. Collect any missing information.
3. Decide how to solve the problem.
4. Execute the necessary actions.
5. Present the result.

The biggest design principle of Triagent v2 is:

> **Every component should have exactly one responsibility.**

---

# High Level Architecture

```text
                          User
                            │
                            ▼
                  Conversation Router
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
          ▼                                   ▼
      Casual Chat                     Goal-Oriented Task
          │                                   │
          ▼                                   ▼
      Chat Service                 Conversation Agent
                                              │
                                              ▼
                                   Task Understanding
                                              │
                                              ▼
                                        Task Planner
                                              │
                                              ▼
                                  Execution Orchestrator
                                              │
                   ┌──────────────────────────┼──────────────────────────┐
                   ▼                          ▼                          ▼
              Gmail Tool               Calendar Tool               Future Tools
                   │                          │
                   └───────────────┬──────────┘
                                   ▼
                            Response Builder
                                   │
                                   ▼
                                  User
```

---

# Core Design Principles

## 1. Single Responsibility

Every component owns exactly one decision.

For example:

| Component | Responsibility |
|------------|----------------|
| Router | Determine conversation state |
| Conversation Agent | Understand the user's request |
| Planner | Decide how to satisfy the request |
| Execution Orchestrator | Execute the plan |
| Response Builder | Present the final response |

No responsibility should exist in multiple components.

---

## 2. Reason Before Acting

Triagent should never think in terms of APIs.

Instead it should reason like this:

```text
User Request

↓

Goal

↓

Strategy

↓

Tools

↓

Execution
```

Not:

```text
User Request

↓

Gmail

↓

Calendar

↓

Execution
```

---

## 3. Tools Are Implementation Details

The assistant should reason using capabilities rather than integrations.

Examples:

Capabilities:

- Search
- Summarize
- Draft
- Reply
- Schedule
- Create
- Update
- Delete

Integrations:

- Gmail
- Google Calendar
- Slack
- Notion

The planner decides **what capability** is needed.

The execution layer decides **which tool** implements that capability.

---

# Component Responsibilities

---

## 1. Conversation Router

### Responsibility

Determine the current conversation state.

### Input

- User message
- Current task (optional)

### Output

One of:

- chat
- new_task
- continue_task
- cancel_task

### Responsibilities

- Detect casual conversation
- Detect task creation
- Detect continuation
- Detect cancellation

### Never

- Understand the task
- Plan execution
- Choose tools

---

## 2. Conversation Agent

### Responsibility

Understand the user's request and collect only factual information.

This component should answer:

> "What is the user trying to accomplish?"

It should never answer:

> "How should I accomplish it?"

---

### Input

- User message
- Current task

---

### Output

```ts
{
  goal,
  domain,
  collected,
  missing,
  state,
  reply
}
```

---

### Responsibilities

Determine:

- User goal
- Task domain
- Known facts
- Missing facts

Ask:

- Exactly one follow-up question if required

Return:

- Updated task understanding

---

### Never

- Generate email subjects
- Generate email bodies
- Generate meeting titles
- Choose APIs
- Generate execution plans
- Mention tools

---

### Example

User:

> Summarize today's emails.

Output:

```json
{
  "goal": "summarize",
  "domain": "gmail",
  "collected": {
    "timeframe": "today"
  },
  "missing": [],
  "state": "ready",
  "reply": "Perfect. I have everything I need."
}
```

---

User:

> Send an email to Rahul.

Output:

```json
{
  "goal": "send",
  "domain": "gmail",
  "collected": {
    "recipientName": "Rahul"
  },
  "missing": [
    "recipientEmail"
  ],
  "state": "collecting",
  "reply": "What's Rahul's email address?"
}
```

---

## 3. Task Planner

### Responsibility

Transform a completed task into an execution strategy.

The planner should answer:

> "What sequence of capabilities satisfies this goal?"

Not:

> "What Gmail payload should I generate?"

---

### Input

- Original request
- Goal
- Domain
- Collected information

---

### Output

A structured execution plan.

Example:

```text
Goal:
Summarize today's emails

↓

Step 1
Search emails received today

↓

Step 2
Summarize results

↓

Step 3
Return summary
```

---

### Responsibilities

- Decide execution strategy
- Determine required capabilities
- Order execution steps
- Decide whether approval is required

---

### Never

- Call APIs
- Generate Gmail payloads
- Generate meeting payloads
- Execute actions

---

## 4. Execution Orchestrator

### Responsibility

Execute the planner's strategy.

---

### Responsibilities

- Execute each plan step
- Route execution to the appropriate tool
- Collect execution results
- Handle failures
- Stop execution when required

---

### Never

- Decide strategy
- Understand user intent

---

## 5. Tool Layer

Each integration is isolated behind a tool.

Examples:

```text
Gmail Tool

Calendar Tool

Future Slack Tool

Future Notion Tool
```

Each tool only knows how to communicate with its own API.

It never knows:

- why it was called
- what the user's goal was

---

## 6. Response Builder

### Responsibility

Convert execution results into a user-friendly response.

Possible outputs:

- Chat response
- Pending approval card
- Success message
- Error message

---

### Never

- Execute actions
- Plan actions

---

# Core Data Model

Instead of representing only an "intent", Triagent separates three concepts.

---

## Goal

What the user wants.

Examples:

- summarize
- search
- send
- reply
- draft
- schedule
- create
- update
- delete
- answer

---

## Domain

Where the information belongs.

Examples:

- gmail
- calendar
- contacts
- tasks

---

## Capability

The atomic ability required to complete a step.

Examples:

- search
- summarize
- draft
- reply
- schedule
- create
- update
- delete

Capabilities are implemented by tools.

---

# End-to-End Flow

## Example 1

User:

> Summarize the emails I received today.

---

Conversation Agent

```text
Goal:
summarize

Domain:
gmail

Collected:
timeframe = today
```

↓

Planner

```text
Search emails

↓

Summarize emails

↓

Return summary
```

↓

Execution

```text
Gmail Search

↓

LLM Summary
```

↓

Response

```text
Summary shown in chat
```

---

## Example 2

User:

> Send Rahul an email thanking him for helping yesterday.

---

Conversation Agent

```text
Goal:
send

Domain:
gmail

Collected:
recipientName = Rahul

Missing:
recipientEmail
```

↓

Assistant

```text
What's Rahul's email address?
```

↓

Conversation Agent

```text
Task Ready
```

↓

Planner

```text
Generate email draft

↓

Request approval

↓

Send email
```

↓

Execution

```text
Generate draft

↓

Pending Approval

↓

Send Gmail
```

---

# Why This Architecture?

This architecture solves several problems present in the previous version.

## Clear Separation of Responsibilities

Every component owns exactly one responsibility.

No duplicated decision making.

---

## Better Scalability

Adding a new integration does not require redesigning the planner.

Only a new tool implementation is required.

---

## Better Reasoning

The assistant reasons about:

- user goals
- capabilities
- execution strategy

instead of directly thinking about APIs.

---

## Easier Testing

Each component can be tested independently.

For example:

- Conversation Agent
- Planner
- Execution
- Tool implementations

can all be validated separately.

---

# Future Extensions

This architecture naturally supports future integrations such as:

- Slack
- Notion
- Google Drive
- Contacts
- WhatsApp
- GitHub

without changing the assistant's reasoning model.

Only new tools need to be implemented.

---

# Summary

Triagent v2 follows a layered architecture:

```text
Understand

↓

Plan

↓

Execute

↓

Respond
```

Every layer owns a single responsibility.

The assistant reasons using user goals and capabilities rather than APIs, making the system easier to extend, easier to maintain, and significantly more reliable as additional integrations are added.