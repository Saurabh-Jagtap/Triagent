import { CardShell } from "../CardShell";
import { CardTag } from "../CardTag";

const insights = [
  {
    label: "Last Meeting",
    value: "6 weeks ago",
  },
  {
    label: "Open Topic",
    value: "Pricing",
  },
  {
    label: "Risk",
    value: "Urgent",
  },
];

export function MeetingPrepCard() {
  return (
    <CardShell dark className="w-full max-w-[330px] sm:max-w-[350px] lg:w-[380px] lg:max-w-none">
      <CardTag label="Meeting Prep" dark />

      {/* Participants */}
      <div className="mt-6 flex -space-x-2">
        {["P", "J", "M"].map((initial, index) => (
          <div
            key={initial}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#13294B] text-xs font-semibold text-[#13294B]"
            style={{
              backgroundColor: ["#F0EAD9", "#E7E2D4", "#DDD5C6"][index],
            }}
          >
            {initial}
          </div>
        ))}
      </div>

      <h3 className="mt-6 font-newsreader text-[22px] lg:text-[24px] italic text-white">
        Ready before you are.
      </h3>

      <p className="mt-2 text-[14px] leading-6 text-white/70">
        Triagent gathered the important context before the meeting starts.
      </p>

      <div className="mt-6 space-y-3">
        {insights.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <span className="text-[12px] uppercase tracking-[0.08em] text-white/45">
              {item.label}
            </span>

            <span className="text-[15px] font-medium text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}