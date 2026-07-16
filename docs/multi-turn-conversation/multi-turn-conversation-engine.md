# Multi-turn Conversation Engine

## Overview

Previously, Triagent used a single-shot workflow:

User Prompt
        ↓
 Planning Agent
        ↓
 Assistant Plan
        ↓
 Approval Card

This worked well only when the user supplied every required field in a single prompt.

Example:

"Send an email to abhishek@gmail.com with subject Test and body Hello."

However, real conversations are incremental.

Users naturally provide information over multiple turns.

Example:

User:
Send an email to Abhishek.

Assistant:
What's Abhishek's email?

User:
abhishek@gmail.com

Assistant:
What should the subject be?

User:
Testing

Assistant:
What should I write?

User:
Hello

Assistant:
[Approval Card]

To support this workflow, the assistant was redesigned around a conversation state machine.