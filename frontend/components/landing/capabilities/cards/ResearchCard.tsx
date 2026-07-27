import { CardShell } from "../CardShell";
import { CardTag } from "../CardTag";

export function ResearchCard() {
  return (
    <CardShell className="w-[200px] sm:w-[220px] lg:w-[240px]">
      <CardTag label="Research" />

      {/* Sources */}
      <div className="mt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#9BA1AC]">
          Sources
        </p>

        <div className="mt-3 flex -space-x-2">
          {["CB", "TC", "PB"].map((item) => (
            <div
              key={item}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#ECE7DB] text-[9px] font-semibold text-[#13294B]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="my-5 h-px bg-[#13294B]/10" />

      <div className="space-y-3">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#9BA1AC]">
            Funding
          </p>

          <h3 className="mt-1 font-newsreader text-3xl text-[#13294B]">
            $40M
          </h3>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#9BA1AC]">
            Lead Investor
          </p>

          <p className="mt-1 text-[14px] font-medium text-[#13294B]">
            XYZ Ventures
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#F6F4EF] px-3 py-2">
          <span className="text-[12px] text-[#5B6472]">
            Confidence
          </span>

          <span className="font-semibold text-[#13294B]">
            96%
          </span>
        </div>
      </div>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#A9822E]">
        Summarized in 14 sec
      </p>
    </CardShell>
  );
}