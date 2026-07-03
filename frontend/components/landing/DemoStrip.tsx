import HeroDemo from "./HeroDemo";

export default function DemoStrip() {
  return (
    <div className="demo-strip">
      <div className="demo-strip-blob"></div>

      <div className="demo-strip-inner">
        <div>
          <p className="eyebrow">Ask anything</p>

          <h2>
            Your inbox and calendar, answered in plain language.
          </h2>

          <p>
            No menus. No filters. Just tell Triagent what you need — it reads
            your Gmail and Calendar and handles the rest.
          </p>

          <div className="demo-examples">
            <div className="demo-ex">
              <span className="demo-arrow">▶</span>
              "What needs my attention today?"
            </div>

            <div className="demo-ex">
              <span className="demo-arrow">▶</span>
              "Schedule a call with the team on Friday."
            </div>

            <div className="demo-ex">
              <span className="demo-arrow">▶</span>
              "Summarise my inbox from this week."
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <HeroDemo />
        </div>
      </div>
    </div>
  );
}