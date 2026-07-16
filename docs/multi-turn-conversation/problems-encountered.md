## Problems Encountered

### 1. Structured Output does not support z.record()

Error

propertyNames is not permitted

Cause

z.record() generates JSON Schema using propertyNames.

Solution

Replace dynamic records with explicit object schemas.

---

### 2. Structured Output does not support discriminatedUnion()

Error

oneOf is not permitted

Cause

z.discriminatedUnion() generates oneOf.

Solution

Temporarily simplify the planner to Gmail-only.

Future versions can redesign the action schema.

---

### 3. User identity mismatch

Better Auth exposed

user.id

while Corsair expected

session.userId

Result

Plugins appeared disconnected even though integrations existed.

Solution

Use session.userId consistently throughout the backend.

---

### 4. Planner executed too early

Initially the planner was called for every message.

This prevented multi-turn conversations.

Solution

Introduce Conversation Orchestrator.

Planner now executes only when

missing.length === 0.

---

### 5. Approval cards disappeared

Large preview cards were clipped because the chat layout constrained height.

Solution

Allow chat messages to grow naturally and remove unnecessary overflow restrictions.

---

### 6. Task creation delegated to the LLM

Initially the Conversation Agent decided

create/update.

This responsibility was moved into the backend.

The backend now decides based on the existence of an active task.