export function ApprovalCard() {
  return (
    <div
      className="
        w-[280px]
        rounded-2xl
        border border-[#13294B]/10
        bg-white
        p-6
        shadow-[0_24px_55px_-30px_rgba(19,41,75,0.24)]
      "
    >
      <div className="mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#A9822E]">
          Ready for approval
        </span>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-[#13294B]/6 bg-[#F8F6F2] p-4">
          <p className="text-sm leading-6 text-[#13294B]">
            Lunch with <strong>Sarah</strong>
          </p>

          <p className="mt-1 text-sm text-[#5B6472]">
            Thursday • 1:00 PM
          </p>
        </div>

        <div className="flex gap-3">
          <button
            className="
              flex-1
              rounded-xl
              bg-[#13294B]
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              transition-colors
              hover:bg-[#0F2240]
            "
          >
            Approve
          </button>

          <button
            className="
              rounded-xl
              border
              border-[#13294B]/10
              px-4
              py-3
              text-sm
              text-[#13294B]
              transition-colors
              hover:bg-[#F8F6F2]
            "
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}