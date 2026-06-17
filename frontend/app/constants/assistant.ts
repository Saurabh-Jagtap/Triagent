export const QUICK_ACTIONS = [
  { label: "Daily Brief", prompt: "Generate my daily brief" },
  {
    label: "Priority Emails",
    prompt: `
Review my inbox.

Identify emails that require action.

Group them into:

1. High Priority
2. Medium Priority
3. Low Priority

Explain why each email belongs in that category.

Focus on actionable emails.
`,
  },
  {
    label: "Upcoming Meetings",
    prompt: `
Review my calendar.

Summarize:

- Upcoming meetings
- Deadlines
- Important events

Highlight anything requiring preparation.
`,
  },
  {
    label: "Focus Today",
    prompt: `
Review my inbox and calendar.

Tell me:

1. What should I focus on today?
2. What needs immediate attention?
3. What can be ignored?
4. What actions should I take next?

Be concise.
`,
  },
  {
    label: "Inbox Summary",
    prompt: `
Summarize my inbox.

Provide:

- Important emails
- Opportunities
- Deadlines
- Recommended actions

Keep it concise.
`,
  },
];