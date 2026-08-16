export function ProductPurposeSection() {
  return (
    <section className="border-t border-[#E7E2D6] bg-[#FCFAF6] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">

        {/* Section Introduction */}
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A5D22]">
            What Triagent does
          </p>

          <h2 className="mt-5 font-newsreader text-4xl font-medium leading-tight tracking-[-0.03em] text-[#161A2B] md:text-5xl">
            Your email and calendar,
            <br />
            <span className="italic text-[#7A5D22]">
              working together.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#5B5F72] md:text-lg md:leading-8">
            Triagent connects with Gmail and Google Calendar to help you
            manage everyday communication and scheduling from one AI
            executive assistant.
          </p>
        </div>

        {/* Capabilities */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">

          {/* Email */}
          <div className="rounded-2xl border border-[#E1DCCF] bg-white p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9C99F] bg-[#FCFAF6]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5D22"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </div>

            <h3 className="mt-6 font-newsreader text-2xl font-medium text-[#161A2B]">
              Understand and act on email
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#5B5F72]">
              Summarize important messages, identify emails that need
              attention, draft replies, and send messages when you explicitly
              ask Triagent to do so.
            </p>
          </div>

          {/* Calendar */}
          <div className="rounded-2xl border border-[#E1DCCF] bg-white p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9C99F] bg-[#FCFAF6]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5D22"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="17"
                  rx="2"
                />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
                <path d="M3 10h18" />
              </svg>
            </div>

            <h3 className="mt-6 font-newsreader text-2xl font-medium text-[#161A2B]">
              Manage your schedule
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#5B5F72]">
              Review calendar information, check availability, and create,
              update, or delete events when you explicitly request the
              assistant to do so.
            </p>
          </div>

          {/* Assistant */}
          <div className="rounded-2xl border border-[#E1DCCF] bg-white p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9C99F] bg-[#FCFAF6]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5D22"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v4" />
                <path d="M12 17v4" />
                <path d="m5.64 5.64 2.83 2.83" />
                <path d="m15.53 15.53 2.83 2.83" />
                <path d="M3 12h4" />
                <path d="M17 12h4" />
                <path d="m5.64 18.36 2.83-2.83" />
                <path d="m15.53 8.47 2.83-2.83" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>

            <h3 className="mt-6 font-newsreader text-2xl font-medium text-[#161A2B]">
              Work through conversation
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#5B5F72]">
              Describe what you need in natural language and Triagent turns
              your request into an actionable task while keeping you in
              control of consequential actions.
            </p>
          </div>

        </div>

        {/* Data-use explanation */}
        <div className="mt-8 rounded-2xl border border-[#D9C99F] bg-[#F8F4EA] px-6 py-6 md:px-8">
          <div className="flex gap-4">

            <div className="mt-0.5 shrink-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A5D22"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 10v6" />
                <path d="M12 7h.01" />
              </svg>
            </div>

            <p className="text-sm leading-6 text-[#5B5F72]">
              Triagent uses the Google account data you authorize to provide
              these email and calendar features. Data is used to perform the
              functionality you request, as described in our{" "}
              <a
                href="/privacy"
                className="font-medium text-[#7A5D22] underline underline-offset-4 transition-colors hover:text-[#13294B]"
              >
                Privacy Policy
              </a>
              .
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}