import { Dot } from "lucide-react";

export default function TrustHeader() {
  return (
    <div className="mx-auto max-w-[340px] px-4 text-center sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#7F621F]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#A9822E]" />
        Your Control
      </div>

      {/* Heading */}
      <h2 className="mt-5 font-newsreader text-[42px] font-medium leading-[1.15] tracking-[-0.02em] text-[#13294B] sm:text-5xl lg:text-[56px]">
        Prepared with AI.
        <span className="mt-1 block italic text-[#7F621F]">
          Completed by you.
        </span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-6 max-w-[480px] text-[15px] leading-7 text-[#5B6472] sm:text-base">
        Triagent prepares every action, explains every change, and waits for
        your approval before anything happens.
      </p>
    </div>
  );
}