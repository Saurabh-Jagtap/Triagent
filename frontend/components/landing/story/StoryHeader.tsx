export function StoryHeader() {
  return (
    <div className="mx-auto max-w-3xl px-6 text-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#A9822E]">
        How it Works
      </span>

      <h2 className="mt-5 font-newsreader text-[38px] md:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.03em] text-[#13294B]">
        One conversation.
        <br />
        Everything else follows.
      </h2>

      <p className="mx-auto mt-6 md:mt-8 max-w-xl text-base md:text-lg leading-7 md:leading-8 text-[#5B6472]">
        Triagent understands your request, prepares the work, and asks for your
        approval before taking action.
      </p>
    </div>
  );
}