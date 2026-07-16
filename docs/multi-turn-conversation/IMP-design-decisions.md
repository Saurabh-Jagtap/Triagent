## Important Design Decisions

### 1. The LLM does not control workflow

Initially the model returned

action = create

action = update

This was removed.

Reason

The backend already knows whether an active task exists.

The backend is therefore responsible for deciding whether a task should be created or updated.

This reduced hallucinations and simplified prompts.

---

### 2. The backend decides readiness

Initially the Conversation Agent returned

state = collecting

state = ready

Eventually the orchestrator was changed to rely on

missing.length

instead of trusting the model.

This makes readiness deterministic.

---

### 3. Conversation Agent and Planning Agent have separate responsibilities

Conversation Agent

↓

Collect information

Planning Agent

↓

Prepare actions

Separating these responsibilities greatly simplified prompting and debugging.

---

### 4. Tasks persist until execution

Tasks are not deleted after planning.

Instead they survive through the approval phase.

Only after successful execution is the task removed.

This allows retries and future editing.