import { CardShell } from "../CardShell";
import { CardTag } from "../CardTag";

export function CalendarCard() {
  return (
    <CardShell className="w-[200px] sm:w-[220px] lg:w-[250px]">
      <CardTag label="Calendar" />

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-10 shrink-0 font-mono text-[11px] text-[#9BA1AC]">
            11:00
          </span>

          <div className="flex-1 rounded-lg bg-[#F4F2EC] px-3 py-2 text-[13px] text-[#9BA1AC] line-through">
            Board Sync
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-10 shrink-0 font-mono text-[11px] text-[#9BA1AC]">
            11:30
          </span>

          <div className="flex-1 rounded-lg bg-[#13294B] px-3 py-2 text-[13px] text-white">
            Board Sync
          </div>
        </div>
      </div>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#7F621F]">
        Conflict resolved automatically
      </p>
    </CardShell>
  );
}