import { CardShell } from "../CardShell";

export function DailyBriefCard() {
  return (
    <CardShell dark className="w-[200px] sm:w-[220px] lg:w-[235px]">
      <div className="flex items-center justify-between">
        <h3 className="font-newsreader text-[18px] italic text-white">
          Daily Brief
        </h3>

        <span className="font-mono text-[10px] text-white/40">
          8:30 AM
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {[
          "Inbox Zero",
          "2 Meetings Ready",
          "3 Priorities",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2"
          >
            <div className="h-2 w-2 rounded-full bg-[#A9822E]" />

            <span className="text-[13px] text-white/80">
              {item}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3">
        <p className="text-[12px] leading-5 text-white/70">
          Everything important is ready before your day begins.
        </p>
      </div>
    </CardShell>
  );
}