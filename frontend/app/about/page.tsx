import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Triagent — AI Executive Assistant",
  description:
    "Triagent is an AI executive assistant that connects to Gmail and Google Calendar to help users manage email and scheduling through natural-language requests.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FCFAF6] text-[#161A2B]">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">

        {/* Brand */}
        <header className="border-b border-[#E7E2D6] pb-10">
          <Link
            href="/"
            className="font-newsreader text-3xl font-medium tracking-[-0.02em] text-[#13294B]"
          >
            Triagent
          </Link>

          <p className="mt-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A5D22]">
            AI Executive Assistant
          </p>
        </header>

        {/* Purpose */}
        <section className="pt-14">
          <h1 className="font-newsreader text-4xl font-medium leading-tight tracking-[-0.03em] md:text-6xl">
            Triagent is an AI executive assistant for Gmail and Google
            Calendar.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#5B5F72]">
            Triagent helps users manage everyday email and scheduling tasks
            through natural-language conversations. Users can ask Triagent
            to understand important email, summarize messages, draft and send
            email, check calendar availability, and create or manage calendar
            events.
          </p>
        </section>

        {/* Gmail */}
        <section className="mt-16 border-t border-[#E7E2D6] pt-10">
          <h2 className="font-newsreader text-3xl font-medium">
            Gmail functionality
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#5B5F72]">
            Triagent connects to a user's Gmail account to provide email
            productivity features. It can read and process email messages
            for summaries and context, identify important messages, create
            drafts, and send email when the user requests the action.
          </p>
        </section>

        {/* Calendar */}
        <section className="mt-12 border-t border-[#E7E2D6] pt-10">
          <h2 className="font-newsreader text-3xl font-medium">
            Google Calendar functionality
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#5B5F72]">
            Triagent connects to Google Calendar to provide scheduling
            functionality. It can read calendar information, check
            availability, and create, update, or delete calendar events
            based on actions requested by the user.
          </p>
        </section>

        {/* Google data */}
        <section className="mt-12 rounded-2xl border border-[#D9C99F] bg-[#F8F4EA] p-7 md:p-8">
          <h2 className="font-newsreader text-3xl font-medium">
            Why Triagent requests Google access
          </h2>

          <p className="mt-4 text-base leading-7 text-[#5B5F72]">
            Triagent requests access to Google account data because Gmail
            and Google Calendar data are required to provide the email and
            scheduling features described above. Triagent uses the Google
            data that the user authorizes to perform these user-facing
            functions.
          </p>

          <p className="mt-4 text-base leading-7 text-[#5B5F72]">
            Triagent's handling of Google user data is described in the{" "}
            <Link
              href="/privacy"
              className="font-medium text-[#7A5D22] underline underline-offset-4 hover:text-[#13294B]"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        {/* CTA / Navigation */}
        <footer className="mt-16 flex flex-wrap gap-5 border-t border-[#E7E2D6] pt-8 text-sm">
          <Link
            href="/"
            className="font-medium text-[#13294B] hover:text-[#7A5D22]"
          >
            Back to Triagent
          </Link>

          <Link
            href="/privacy"
            className="font-medium text-[#13294B] hover:text-[#7A5D22]"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="font-medium text-[#13294B] hover:text-[#7A5D22]"
          >
            Terms of Service
          </Link>
        </footer>

      </div>
    </main>
  );
}