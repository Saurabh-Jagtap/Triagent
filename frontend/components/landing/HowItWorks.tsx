export default function HowItWorks() {
  return (
    <section id="how-it-works" className="hiw">
      <p className="eyebrow">How it works</p>

      <h2 className="h2">
        No setup. No learning curve.
        <br />
        Just ask.
      </h2>

      <p className="section-sub">
        Connect once. Triagent reads your Gmail and Calendar, then answers in
        plain language — no filters to configure, no dashboards to manage.
      </p>

      <div className="steps">
        <div className="step-rail"></div>

        <div className="step-card">
          <div className="step-icon">01</div>

          <div className="step-title">
            Connect Gmail &amp; Calendar
          </div>

          <div className="step-desc">
            One-click OAuth. Read-only by default. Triagent never stores your
            password.
          </div>

          <div className="step-ex">
            Connected — ready.
          </div>
        </div>

        <div className="step-card">
          <div className="step-icon">02</div>

          <div className="step-title">
            Ask in plain English
          </div>

          <div className="step-desc">
            No dropdowns, no filters. Just type what you need, the way you'd
            tell a person.
          </div>

          <div className="step-ex">
            "Draft a reply to Sarah."
          </div>
        </div>

        <div className="step-card">
          <div className="step-icon">03</div>

          <div className="step-title">
            It acts, you approve
          </div>

          <div className="step-desc">
            Triagent drafts, schedules, or summarises — then puts the result in
            your hands.
          </div>

          <div className="step-ex">
            Draft ready. Send?
          </div>
        </div>
      </div>
    </section>
  );
}