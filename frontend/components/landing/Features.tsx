const features = [
  {
    icon: "☀️",
    title: "Daily Brief",
    desc: "One morning summary of what matters — emails, meetings, what to act on.",
    ask: "What's on my plate today?",
    ans: "3 emails, no meetings. Sarah's is most urgent.",
  },
  {
    icon: "📊",
    title: "Priority Emails",
    desc: "Sorted into high, medium, low — with a reason for each ranking.",
    ask: "Sort my inbox by urgency.",
    ans: "2 high, 3 medium, rest can wait.",
  },
  {
    icon: "📅",
    title: "Meeting Scheduler",
    desc: "Book calls and draft invites in a single natural-language request.",
    ask: "Book 30 min with Priya tomorrow.",
    ans: "Booked 3pm. Invite drafted.",
  },
  {
    icon: "✏️",
    title: "Draft Replies",
    desc: "Context-aware reply drafts in your tone, ready to review in seconds.",
    ask: "Reply saying I'll review by noon.",
    ans: "Draft ready to send.",
  },
  {
    icon: "🔗",
    title: "Gmail Connected",
    desc: "Secure OAuth — read access only. Zero password storage. Revoke anytime.",
    ask: "What emails need replies?",
    ans: "4 unread. 2 need action.",
  },
  {
    icon: "📆",
    title: "Calendar Synced",
    desc: "Your schedule pulled alongside your inbox, no app-switching needed.",
    ask: "Am I free Thursday afternoon?",
    ans: "Yes — 2pm to 5pm is clear.",
  },
];

export default function Features() {
  return (
    <div id="features" className="feat-section">
      <div className="feat-inner">
        <p className="eyebrow">Features</p>

        <h2 className="h2">
          Everything your inbox demands.
          <br />
          Nothing it doesn't.
        </h2>

        <p className="feat-hint">
          Hover each card to see a real example.
        </p>

        <div className="feat-grid">
          {features.map((f, i) => (
            <div className="feat-wrap" key={f.title}>
              <div className="feat-inner-wrap">
                <div
                  className="feat-front"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  <div className="feat-icon">{f.icon}</div>

                  <div className="feat-title">{f.title}</div>

                  <div className="feat-desc">{f.desc}</div>
                </div>

                <div
                  className="feat-back"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  <div className="feat-back-label">
                    ✦ Try asking
                  </div>

                  <div className="feat-ask">
                    "{f.ask}"
                  </div>

                  <div className="feat-ans">
                    → {f.ans}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}