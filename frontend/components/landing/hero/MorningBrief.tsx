import { BriefItem } from "./BriefItem";
import { DraftCard } from "./DraftCard";
import { NextUp } from "./NextUp";

export function MorningBrief() {
  return (
    <div className="relative mx-auto w-full max-w-[600px] rounded-[28px] bg-[#1B2138] p-8 shadow-[0_40px_80px_rgba(22,26,43,0.25)] lg:p-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg text-[#A9822E]">✦</span>

          <h3 className="font-newsreader text-2xl italic text-[#F6F4EE]">
            Morning Brief
          </h3>
        </div>

        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#7B8198]">
          8:30 AM
        </span>
      </header>

      <div className="mt-8 space-y-5">
        <BriefItem
          title="Sarah's term sheet needs your signature before noon."
        />

        <BriefItem
          title="8 low-signal threads moved to Later."
          subtitle="Triaged automatically"
        />

        <BriefItem
          title="Board sync moved to 11:30 — no conflicts."
          active={false}
        />
      </div>

      <div className="my-6 h-px bg-[#303754]" />

      <NextUp />

      <DraftCard />
    </div>
  );
}