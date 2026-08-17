import { CTAForm } from "./CTAForm"
import { TrustRow } from "./TrustRow";

export function HeroContent() {
  return (
    <div className="flex w-full flex-col justify-center">
      {/* Badge */}
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#A9822E] bg-[#FCFAF6] px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-[#A9822E]" />

        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A5D22]">
          TRIAGENT · AI EXECUTIVE ASSISTANT
        </span>
      </div>

      {/* Heading */}
      <h1 className="mt-8  max-w-[720px] font-newsreader text-5xl font-medium leading-none tracking-[-0.04em] text-[#161A2B] md:text-6xl lg:text-7xl">
        Delegate the work.
        <br />
        <span className="italic text-[#7A5D22]">
          Keep the results.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-8 max-w-xl text-lg leading-8 text-[#5B5F72]">
        Triagent is an AI executive assistant that connects to your Gmail
        and Google Calendar account. It uses authorized Google data to
        summarize and organize email, draft and send messages, check
        calendar availability, and create and manage calendar events based
        on your requests.
      </p>

      <p className="mt-5 max-w-xl text-sm leading-6 text-[#6B7180]">
        Triagent only accesses Google account data needed to provide these
        features. See our{" "}
        <a
          href="/privacy"
          className="font-medium text-[#7A5D22] underline underline-offset-4 hover:text-[#13294B]"
        >
          Privacy Policy
        </a>{" "}
        for details about how Google user data is accessed, used, stored,
        and shared.
      </p>

      {/* CTA */}
      <div className="mt-10">
        <CTAForm />
      </div>

      {/* Trust */}
      <div className="mt-8">
        <TrustRow />
      </div>

    </div>
  );
}