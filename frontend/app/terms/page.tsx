import LegalPageLayout from "@/components/legal/legalPageLayout";

const sectionClass =
  "border-t border-[#E7E2D6] pt-10 mt-10";

const headingClass =
  "font-newsreader text-2xl font-medium tracking-tight text-[#13294B] sm:text-[28px]";

const paragraphClass =
  "mt-5 max-w-3xl text-[15px] leading-7 text-[#5B6472] sm:text-base sm:leading-8";

const listClass =
  "mt-5 max-w-3xl space-y-3 pl-5 text-[15px] leading-7 text-[#5B6472] sm:text-base sm:leading-8";

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="August 15, 2026"
    >
      <div className="space-y-0">

        {/* Introduction */}
        <div className="max-w-3xl">
          <p className="text-[17px] leading-8 text-[#5B6472] sm:text-lg sm:leading-9">
            These Terms of Service govern your access to and use of Triagent,
            operated by{" "}
            <strong className="font-medium text-[#13294B]">
              Saurabh Jagtap
            </strong>
            . By accessing or using Triagent, you agree to these Terms.
          </p>
        </div>

        {/* 1 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            01
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            About Triagent
          </h2>

          <p className={paragraphClass}>
            Triagent is an AI-powered executive assistant designed to help
            users manage email, calendar, and productivity tasks through
            connected services.
          </p>

          <p className={paragraphClass}>
            Triagent may integrate with third-party services, including Gmail
            and Google Calendar, when you choose to connect and authorize
            those services.
          </p>
        </section>

        {/* 2 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            02
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Your Account
          </h2>

          <p className={paragraphClass}>
            You are responsible for providing accurate information when
            creating your Triagent account and for maintaining the security of
            your account credentials.
          </p>

          <p className={paragraphClass}>
            You are responsible for activity performed through your account
            and should notify us if you believe your account has been accessed
            or used without authorization.
          </p>
        </section>

        {/* 3 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            03
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Google Integrations
          </h2>

          <p className={paragraphClass}>
            Triagent can connect to Google services only after you explicitly
            authorize the requested permissions through Google&apos;s OAuth
            authorization process.
          </p>

          <p className={paragraphClass}>
            You may disconnect your Google integrations through Triagent&apos;s
            account settings. Disconnecting an integration causes Triagent to
            revoke the corresponding Google authorization and remove the
            application&apos;s connection information as described in our
            Privacy Policy.
          </p>

          <p className={paragraphClass}>
            Your use of Gmail and Google Calendar remains subject to
            Google&apos;s own terms, policies, and service availability.
          </p>
        </section>

        {/* 4 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            04
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Actions Performed on Your Behalf
          </h2>

          <p className={paragraphClass}>
            Triagent may perform actions on connected services when you
            explicitly request or authorize those actions.
          </p>

          <p className={paragraphClass}>
            Depending on the permissions you grant, these actions may include:
          </p>

          <ul className={listClass}>
            <li>Creating and managing email drafts.</li>
            <li>Sending email messages.</li>
            <li>Reading and managing email information.</li>
            <li>Creating calendar events.</li>
            <li>Updating calendar events.</li>
            <li>Deleting calendar events.</li>
            <li>Checking calendar availability.</li>
          </ul>

          <div className="mt-7 rounded-xl border border-[#E7E2D6] bg-[#F8F6F1] px-5 py-5 sm:px-6">
            <p className="text-sm leading-7 text-[#5B6472] sm:text-[15px]">
              You are responsible for reviewing important information before
              authorizing consequential actions, particularly when an action
              sends a message or changes your calendar.
            </p>
          </div>
        </section>

        {/* 5 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            05
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            AI-Generated Content
          </h2>

          <p className={paragraphClass}>
            Triagent uses artificial intelligence to interpret requests,
            summarize information, generate drafts, and assist with
            productivity tasks.
          </p>

          <p className={paragraphClass}>
            AI-generated content may be incomplete, inaccurate, outdated, or
            inappropriate for a particular situation. You should review
            AI-generated content before relying on it or authorizing actions
            based on it.
          </p>

          <div className="mt-7 border-l-2 border-[#13294B] pl-5">
            <p className="text-[15px] leading-7 text-[#5B6472] sm:text-base sm:leading-8">
              Triagent does not guarantee that AI-generated responses,
              summaries, classifications, recommendations, drafts, or other
              outputs will always be accurate or error-free.
            </p>
          </div>
        </section>

        {/* 6 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            06
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Email and Calendar Responsibility
          </h2>

          <p className={paragraphClass}>
            When you authorize Triagent to send an email or modify your
            calendar, you remain responsible for the resulting action.
          </p>

          <p className={paragraphClass}>
            You should verify recipients, message content, dates, times,
            attendees, and other important details before authorizing actions
            that could have significant consequences.
          </p>
        </section>

        {/* 7 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            07
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Acceptable Use
          </h2>

          <p className={paragraphClass}>
            You agree to use Triagent only for lawful purposes and in
            accordance with these Terms.
          </p>

          <p className={paragraphClass}>
            You must not use Triagent to:
          </p>

          <ul className={listClass}>
            <li>
              Violate applicable laws, regulations, or the rights of others.
            </li>
            <li>
              Access or attempt to access another person&apos;s accounts or
              information without authorization.
            </li>
            <li>
              Send spam, phishing messages, fraudulent communications, or
              other abusive content.
            </li>
            <li>
              Circumvent security mechanisms or attempt to interfere with the
              operation of Triagent.
            </li>
            <li>
              Use Triagent in a manner that violates Google&apos;s applicable
              policies or the policies of other connected services.
            </li>
          </ul>
        </section>

        {/* 8 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            08
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Third-Party Services
          </h2>

          <p className={paragraphClass}>
            Triagent depends on third-party services, including Google
            services and AI infrastructure, to provide certain features.
          </p>

          <p className={paragraphClass}>
            Third-party services may change, become unavailable, restrict
            access, or modify their APIs and policies. We are not responsible
            for disruptions caused by third-party services outside our
            control.
          </p>
        </section>

        {/* 9 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            09
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Intellectual Property
          </h2>

          <p className={paragraphClass}>
            Triagent and its associated software, design, branding, and other
            original materials are owned by or licensed to Triagent and are
            protected by applicable intellectual property laws.
          </p>

          <p className={paragraphClass}>
            These Terms do not grant you ownership of Triagent&apos;s software,
            branding, or other intellectual property.
          </p>

          <p className={paragraphClass}>
            You retain your rights to content and information that you provide
            to Triagent or access through your authorized third-party
            accounts, subject to the rights and licenses necessary for
            Triagent to provide the service.
          </p>
        </section>

        {/* 10 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            10
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Service Availability
          </h2>

          <p className={paragraphClass}>
            We aim to keep Triagent available and reliable, but we do not
            guarantee that the service will always be available, uninterrupted,
            secure, or error-free.
          </p>

          <p className={paragraphClass}>
            Features may be changed, suspended, or discontinued as Triagent
            develops.
          </p>
        </section>

        {/* 11 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            11
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Disclaimer
          </h2>

          <p className={paragraphClass}>
            Triagent is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis to the extent permitted by applicable law.
          </p>

          <p className={paragraphClass}>
            We do not guarantee the accuracy, completeness, reliability, or
            suitability of information or AI-generated results provided
            through the service.
          </p>

          <p className={paragraphClass}>
            Triagent is an assistant and productivity tool. It is not a
            substitute for professional legal, financial, medical, or other
            specialized advice.
          </p>
        </section>

        {/* 12 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            12
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Limitation of Liability
          </h2>

          <p className={paragraphClass}>
            To the maximum extent permitted by applicable law, Triagent and
            its operator will not be liable for indirect, incidental, special,
            consequential, or punitive damages arising from or related to your
            use of the service.
          </p>

          <p className={paragraphClass}>
            This includes, where permitted by law, losses resulting from
            reliance on AI-generated information, incorrect automated actions,
            third-party service interruptions, or unauthorized access
            resulting from factors outside our reasonable control.
          </p>
        </section>

        {/* 13 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            13
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Account Suspension or Termination
          </h2>

          <p className={paragraphClass}>
            We may suspend or terminate access to Triagent if necessary to
            protect the service, investigate abuse, comply with legal
            obligations, or address violations of these Terms.
          </p>

          <p className={paragraphClass}>
            You may stop using Triagent at any time and may request deletion
            of your account as described in our Privacy Policy.
          </p>
        </section>

        {/* 14 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            14
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Changes to These Terms
          </h2>

          <p className={paragraphClass}>
            We may update these Terms from time to time as Triagent evolves or
            as legal or regulatory requirements change.
          </p>

          <p className={paragraphClass}>
            Updated Terms will be published on this page and the &quot;Last
            updated&quot; date will be revised.
          </p>
        </section>

        {/* 15 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            15
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Governing Law
          </h2>

          <p className={paragraphClass}>
            These Terms will be governed by the applicable laws of India,
            without regard to conflict-of-law principles, except where
            applicable law requires otherwise.
          </p>
        </section>

        {/* 16 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            16
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Contact
          </h2>

          <p className={paragraphClass}>
            If you have questions about these Terms, contact:
          </p>

          <div className="mt-7 rounded-xl border border-[#E7E2D6] bg-[#F8F6F1] px-5 py-5 sm:px-6">
            <p className="text-sm leading-7 text-[#13294B] sm:text-[15px]">
              <strong className="font-medium">
                Saurabh Jagtap
              </strong>
              <br />
              <span className="text-[#5B6472]">
                Email:{" "}
              </span>
              <a
                href="mailto:saurabhworkspace123@gmail.com"
                className="underline decoration-[#C8C2B5] underline-offset-4 transition-colors hover:text-[#13294B]"
              >
                saurabhworkspace123@gmail.com
              </a>
            </p>
          </div>
        </section>

      </div>
    </LegalPageLayout>
  );
}