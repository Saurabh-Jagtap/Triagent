## High Level Architecture

                User Message
                     │
                     ▼
         Conversation Orchestrator
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
Conversation Agent        Existing Pending Task
         │                       │
         └───────────┬───────────┘
                     ▼
              Updated Task State
                     │
         Missing fields?
              │            │
             Yes           No
              │            │
              ▼            ▼
      Assistant Reply    Planning Agent
                              │
                              ▼
                       Assistant Plan
                              │
                              ▼
                      Approval Cards