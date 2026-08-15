import LegalPageLayout from "@/components/legal/legalPageLayout";

const sectionClass =
  "border-t border-[#E7E2D6] pt-10 mt-10";

const headingClass =
  "font-newsreader text-2xl font-medium tracking-tight text-[#13294B] sm:text-[28px]";

const paragraphClass =
  "mt-5 max-w-3xl text-[15px] leading-7 text-[#5B6472] sm:text-base sm:leading-8";

const listClass =
  "mt-5 max-w-3xl space-y-3 pl-5 text-[15px] leading-7 text-[#5B6472] sm:text-base sm:leading-8";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="August 15, 2026"
    >
      <div className="space-y-0">

        {/* Introduction */}
        <div className="max-w-3xl">
          <p className="text-[17px] leading-8 text-[#5B6472] sm:text-lg sm:leading-9">
            Triagent is operated by{" "}
            <strong className="font-medium text-[#13294B]">
              Saurabh Jagtap
            </strong>
            . This Privacy Policy explains how Triagent collects, uses,
            stores, and protects information when you use the Triagent
            service and its integrations with Google services.
          </p>
        </div>

        {/* 1 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            01
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Information We Collect
          </h2>

          <p className={paragraphClass}>
            Triagent collects information necessary to provide and improve
            the service. Depending on how you use Triagent, this may include:
          </p>

          <ul className={listClass}>
            <li>
              <strong className="font-medium text-[#13294B]">
                Account information:
              </strong>{" "}
              name, email address, profile image, timezone, and information
              associated with your authentication account.
            </li>

            <li>
              <strong className="font-medium text-[#13294B]">
                Application information:
              </strong>{" "}
              information generated or provided while using Triagent,
              including assistant interactions and application-related data.
            </li>

            <li>
              <strong className="font-medium text-[#13294B]">
                Google account information:
              </strong>{" "}
              information made available through the Google services that you
              explicitly connect to Triagent.
            </li>
          </ul>
        </section>

        {/* 2 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            02
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Google Account and Google User Data
          </h2>

          <p className={paragraphClass}>
            Triagent allows you to connect your Google account, including
            Gmail and Google Calendar, so that the assistant can perform
            actions that you explicitly request.
          </p>

          <p className={paragraphClass}>
            Depending on the Google services you connect and the permissions
            you authorize, Triagent may access information such as:
          </p>

          <ul className={listClass}>
            <li>Gmail messages and related message information.</li>
            <li>
              Email subjects, senders, recipients, snippets, and timestamps.
            </li>
            <li>Email labels and message state.</li>
            <li>Google Calendar events and calendar availability.</li>
            <li>
              Calendar event information required to create or manage events.
            </li>
          </ul>

          <div className="mt-7 rounded-xl border border-[#E7E2D6] bg-[#F8F6F1] px-5 py-5 sm:px-6">
            <p className="text-sm leading-7 text-[#5B6472] sm:text-[15px]">
              Triagent only accesses Google data through permissions that you
              explicitly authorize through Google&apos;s OAuth consent
              process.
            </p>
          </div>
        </section>

        {/* 3 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            03
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            How We Use Your Information
          </h2>

          <p className={paragraphClass}>
            We use information collected through Triagent to provide the
            features you request, including:
          </p>

          <ul className={listClass}>
            <li>Providing and maintaining your Triagent account.</li>
            <li>
              Displaying and organizing your connected email information.
            </li>
            <li>Providing email search and productivity functionality.</li>
            <li>
              Generating email summaries and identifying important messages.
            </li>
            <li>Creating and managing email drafts when requested.</li>
            <li>Sending emails when you explicitly authorize the action.</li>
            <li>
              Reading and managing calendar information when requested.
            </li>
            <li>
              Creating, updating, or deleting calendar events when requested.
            </li>
            <li>Checking calendar availability for scheduling.</li>
            <li>Maintaining and securing connected integrations.</li>
          </ul>
        </section>

        {/* 4 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            04
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Email Data Storage
          </h2>

          <p className={paragraphClass}>
            Triagent stores certain Gmail information in its PostgreSQL
            database to provide email-related functionality and efficient
            retrieval.
          </p>

          <p className={paragraphClass}>
            Depending on the information returned by Gmail, stored information
            may include message and thread identifiers, subject, sender,
            recipients, snippets, message content, labels, read status,
            timestamps, and related Gmail metadata.
          </p>

          <div className="mt-7 border-l-2 border-[#13294B] pl-5">
            <p className="text-[15px] leading-7 text-[#5B6472] sm:text-base sm:leading-8">
              Triagent does not use stored email information for advertising
              or sell email information to third parties.
            </p>
          </div>
        </section>

        {/* 5 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            05
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            AI Processing
          </h2>

          <p className={paragraphClass}>
            Triagent uses OpenAI&apos;s AI services to provide features such
            as email summarization, classification, prioritization,
            action-item extraction, and deadline detection.
          </p>

          <p className={paragraphClass}>
            To provide these features, Triagent may send selected email
            information to OpenAI for processing. The information used by
            Triagent&apos;s email summarization service includes the message
            identifier, sender, subject, email snippet, and received
            timestamp.
          </p>

          <div className="mt-7 rounded-xl border border-[#E7E2D6] bg-[#F8F6F1] px-5 py-5 sm:px-6">
            <p className="text-sm leading-7 text-[#5B6472] sm:text-[15px]">
              Triagent does not intentionally send the full stored email body
              to the email summarization service described above.
            </p>
          </div>

          <p className={paragraphClass}>
            AI-generated results may contain errors. You should review
            important information and actions before relying on or authorizing
            them.
          </p>
        </section>

        {/* 6 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            06
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Google Calendar Data
          </h2>

          <p className={paragraphClass}>
            When you connect Google Calendar, Triagent uses the authorized
            Google Calendar integration to read calendar information, check
            availability, and perform scheduling actions requested by you.
          </p>

          <p className={paragraphClass}>
            When you ask Triagent to create an event, the information
            necessary to create that event may include the event title,
            attendee email addresses, start time, and end time. This
            information is sent to Google Calendar to perform the requested
            action.
          </p>

          <p className={paragraphClass}>
            Triagent does not use Google Calendar information for advertising
            or sell calendar information to third parties.
          </p>
        </section>

        {/* 7 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            07
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            OAuth Credentials and Connected Accounts
          </h2>

          <p className={paragraphClass}>
            When you connect Gmail or Google Calendar, Triagent uses Corsair
            to manage the OAuth credentials required to maintain the
            authorized integration.
          </p>

          <p className={paragraphClass}>
            OAuth credentials and integration information are stored and
            managed within the application&apos;s infrastructure. They are
            used only to maintain authorized connections and perform the
            Google service operations requested through Triagent.
          </p>
        </section>

        {/* 8 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            08
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Sharing of Information
          </h2>

          <p className={paragraphClass}>
            Triagent does not sell your personal information or Google user
            data. We share information only when necessary to provide the
            functionality of the service.
          </p>

          <p className={paragraphClass}>
            This includes using OpenAI to process selected email information
            for AI-powered email productivity features. Triagent may also rely
            on infrastructure and service providers necessary to operate the
            application.
          </p>

          <div className="mt-7 border-l-2 border-[#13294B] pl-5">
            <p className="text-[15px] leading-7 text-[#5B6472] sm:text-base sm:leading-8">
              We do not use Google user data for advertising, sell Google user
              data, or transfer Google user data to data brokers.
            </p>
          </div>
        </section>

        {/* 9 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            09
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Google API Services User Data Policy
          </h2>

          <p className={paragraphClass}>
            Triagent&apos;s use and transfer of information received from
            Google APIs will comply with the Google API Services User Data
            Policy, including the Limited Use requirements applicable to
            restricted Google OAuth scopes.
          </p>

          <p className={paragraphClass}>
            Google user data is used only to provide the user-facing
            functionality described in Triagent and is not used for
            advertising or sold to third parties.
          </p>
        </section>

        {/* 10 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            10
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Data Retention
          </h2>

          <p className={paragraphClass}>
            Triagent retains information for as long as necessary to provide
            the service and the functionality requested by the user, subject
            to the deletion options described below.
          </p>

          <p className={paragraphClass}>
            When you disconnect a Google integration, Triagent revokes the
            corresponding Google authorization, clears the stored OAuth access
            and refresh tokens for that integration, and removes the
            application&apos;s connected-account mapping.
          </p>
        </section>

        {/* 11 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            11
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Deleting Your Account
          </h2>

          <p className={paragraphClass}>
            You may request deletion of your Triagent account. When an
            account is deleted, Triagent revokes the user&apos;s Gmail and
            Google Calendar authorizations and deletes application data
            associated with the account.
          </p>

          <p className={paragraphClass}>
            This includes stored email records, connected-account mappings,
            integration records, and the user&apos;s Triagent account
            information, subject to any data that may need to be retained
            where required by law or for legitimate security purposes.
          </p>
        </section>

        {/* 12 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            12
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Security
          </h2>

          <p className={paragraphClass}>
            Triagent uses technical and organizational measures designed to
            protect information against unauthorized access, alteration,
            disclosure, or destruction.
          </p>

          <p className={paragraphClass}>
            OAuth credentials are managed through the application&apos;s
            integration infrastructure, and access to connected Google
            services is based on authorization granted through Google&apos;s
            OAuth system.
          </p>

          <p className={paragraphClass}>
            However, no internet-based service can guarantee absolute
            security.
          </p>
        </section>

        {/* 13 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            13
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Your Choices
          </h2>

          <p className={paragraphClass}>
            You can control whether Triagent has access to your Gmail and
            Google Calendar accounts by connecting or disconnecting those
            integrations from your account settings.
          </p>

          <p className={paragraphClass}>
            You may also request deletion of your Triagent account and
            associated application data by contacting us.
          </p>
        </section>

        {/* 14 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            14
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Children&apos;s Privacy
          </h2>

          <p className={paragraphClass}>
            Triagent is not intended for children under the age required by
            applicable law. We do not knowingly collect personal information
            from children without appropriate authorization.
          </p>
        </section>

        {/* 15 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            15
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Changes to This Privacy Policy
          </h2>

          <p className={paragraphClass}>
            We may update this Privacy Policy from time to time to reflect
            changes to Triagent, its features, or applicable legal and
            regulatory requirements.
          </p>

          <p className={paragraphClass}>
            When changes are made, the updated policy will be published on
            this page and the &quot;Last updated&quot; date will be revised.
          </p>
        </section>

        {/* 16 */}
        <section className={sectionClass}>
          <p className="font-mono text-xs tracking-[0.18em] text-[#9BA1AC]">
            16
          </p>

          <h2 className={`mt-3 ${headingClass}`}>
            Contact Us
          </h2>

          <p className={paragraphClass}>
            If you have questions about this Privacy Policy, your personal
            information, Google user data, or a request to delete your
            information, contact:
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