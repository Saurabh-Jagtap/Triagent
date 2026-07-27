export function DraftCard() {
  return (
    <div className="mt-8 rounded-2xl border border-[#3A435E] bg-[#222A42] p-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#A9822E]">
        Drafted For You
      </span>

      <p className="mt-4 text-sm leading-7 text-[#DADCE5]">
        “Hi Priya — circling back on the pricing draft.
        Happy to jump on a 15-minute call Thursday or
        Friday if that's easier.”
      </p>

      <div className="mt-6 flex gap-3">
        <button className="rounded-lg bg-[#A9822E] px-4 py-2 text-sm font-medium text-[#1B1503] transition hover:bg-[#B89240]">
          Approve
        </button>

        <button className="rounded-lg border border-[#3A435E] px-4 py-2 text-sm text-[#C9CDD8] transition hover:bg-[#2B334B]">
          Edit
        </button>
      </div>
    </div>
  );
}