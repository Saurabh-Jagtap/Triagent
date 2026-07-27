import { CardShell } from "../CardShell";
import { CardTag } from "../CardTag";

export function FollowUpCard() {
  return (
    <CardShell className="w-[230px] sm:w-[250px] lg:w-[280px]">
      <CardTag label="Draft Email" />

      <div className="mt-5 space-y-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#9BA1AC]">
            To
          </p>

          <p className="mt-1 font-medium text-[#13294B]">
            Priya Sharma
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#9BA1AC]">
            Subject
          </p>

          <p className="mt-1 text-[14px] text-[#13294B]">
            Pricing Follow-up
          </p>
        </div>

        <div className="rounded-xl bg-[#F8F6F2] p-3">
          <p className="line-clamp-3 text-[13px] leading-6 text-[#5B6472] italic">
            Circling back on the pricing proposal. Happy to jump on a quick
            call Thursday or Friday if that works for you.
          </p>
        </div>

        <button className="rounded-full bg-[#A9822E] px-5 py-2 text-sm font-medium text-[#241B04] shadow-[0_8px_16px_-8px_rgba(169,130,46,0.7)] transition-colors hover:bg-[#957327]">
          Approve Draft
        </button>
      </div>
    </CardShell>
  );
}