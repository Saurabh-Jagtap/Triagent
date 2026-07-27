import { CardShell } from "../CardShell";
import { CardTag } from "../CardTag";

export function InboxCard() {
  return (
    <CardShell className="w-[190px] sm:w-[200px] lg:w-[220px]">
      <CardTag label="Inbox" />

      <div className="mt-4">
        <h3 className="font-newsreader text-[48px] leading-none text-[#13294B]">
          36
        </h3>

        <p className="mt-1 text-[13px] leading-5 text-[#5B6472]">
          emails cleared before 8 AM
        </p>
      </div>

      <div className="my-5 h-px bg-[#13294B]/10" />

      <div className="flex items-start gap-2">
        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#A9822E]" />

        <p className="text-[13px] leading-5 text-[#13294B]">
          Except this one — needs your signature.
        </p>
      </div>
    </CardShell>
  );
}