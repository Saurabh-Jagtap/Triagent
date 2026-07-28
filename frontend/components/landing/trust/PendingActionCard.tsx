import ActionButton from "./shared/ActionButton";
import Divider from "./shared/Divider";
import StatusPill from "./StatusPill";

export default function PendingActionCard() {
  return (
    <div className="mx-auto w-full max-w-[560px] rounded-[28px] border border-[#13294B]/10 bg-[radial-gradient(ellipse_at_top,rgba(169,130,46,0.05),transparent_65%)] p-6 sm:p-8 lg:p-12">
      <div className="rounded-[22px] border border-[#13294B]/5 bg-gradient-to-b from-white to-[#FBFAF7] p-6 shadow-[0_1px_1px_rgba(19,41,75,0.04),0_46px_80px_-38px_rgba(19,41,75,0.30)] sm:p-8">
        <StatusPill>Waiting for approval</StatusPill>

        <Divider />

        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9BA1AC]">
          Draft Email
        </p>

        <div className="mt-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#9BA1AC]">To</span>

            <span className="text-[15px] font-medium text-[#13294B]">
              Sarah
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#9BA1AC]">Subject</span>

            <span className="text-[15px] font-medium text-[#13294B]">
              Lunch Thursday
            </span>
          </div>
        </div>

        <p className="mt-6 font-newsreader text-[17px] italic leading-7 text-[#13294B]">
          "Let's catch up this Thursday afternoon..."
        </p>

        <Divider />

        <div className="flex flex-wrap items-center gap-3">
          <ActionButton variant="primary">Approve</ActionButton>

          <ActionButton variant="secondary">Edit</ActionButton>

          <ActionButton variant="ghost">Cancel</ActionButton>
        </div>
      </div>
    </div>
  );
}