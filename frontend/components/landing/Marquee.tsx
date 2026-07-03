const marqueeItems = [
  "Gmail integration",
  "Google Calendar integration",
  "Secured by OAuth",
  "AI-drafted replies",
  "Conversational scheduling",
  "Meeting summaries",
  "Inbox triage",
  "Daily briefing",
  "Revoke access anytime",
];

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <span className="marquee-item" key={index}>
            <span className="marquee-dot"></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}