## Components

### Conversation Agent

Responsible only for understanding conversation.

Responsibilities

- Detect user intent
- Extract information
- Identify missing fields
- Generate natural follow-up question

It never:

- executes actions
- creates plans
- sends emails
- creates calendar events

It simply collects information.

---

### Task Manager

Stores unfinished conversations.

Responsibilities

- create task
- update task
- retrieve task
- clear task

Each user can have one active task.

---

### Conversation Orchestrator

Acts as the workflow engine.

Responsibilities

- load active task
- invoke Conversation Agent
- update task
- determine whether more information is required
- invoke Planning Agent when task is complete

The orchestrator owns all business decisions.

The LLM never decides application flow.

---

### Planning Agent

Responsible only for planning.

Input

Completed task

Output

AssistantPlan

Responsibilities

- convert collected information into executable actions
- prepare approval cards

Never executes actions.