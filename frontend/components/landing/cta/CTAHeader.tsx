export default function CTAHeader() {
  return (
    <div className="mx-auto max-w-[340px] px-4 text-center sm:max-w-[430px] md:max-w-[520px] lg:max-w-[620px]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#7F621F]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#A9822E]" />
        Start the conversation
      </div>

      {/* Heading */}
      <h2 className="mt-7 font-newsreader text-[42px] font-medium leading-[1.12] tracking-[-0.02em] text-[#13294B] sm:text-5xl md:text-[58px] lg:text-[68px]">
        One conversation.
        <br />
        Everything else follows.
      </h2>

      {/* Description */}
      <p className="mx-auto mt-7 max-w-[440px] text-[15px] leading-7 text-[#5B6472] sm:text-base">
        Triagent helps you prepare emails, meetings, and follow-ups while you
        stay in complete control.
      </p>
    </div>
  );
}