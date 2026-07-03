import { ArrowUp } from "lucide-react";

export default function HeroDemo() {
  return (
    <div className="demo">
      <div className="demo-chrome">
        <span
          className="demo-dot"
          style={{ background: "#E05C30" }}
        ></span>

        <span
          className="demo-dot"
          style={{ background: "#E8B84B" }}
        ></span>

        <span
          className="demo-dot"
          style={{ background: "#4CAF78" }}
        ></span>

        <span className="demo-title">
          Triagent — Assistant
        </span>
      </div>

      <div
        className="demo-body"
        id="demoBody1"
      ></div>

      <div className="demo-composer">
        <span className="composer-text">
          Ask Triagent anything...
        </span>

        <div className="send-btn">
            <ArrowUp/>
        </div>
      </div>
    </div>
  );
}