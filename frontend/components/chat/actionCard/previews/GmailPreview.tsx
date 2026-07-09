import type { GmailPayload } from "@repo/db/src/chat";
import { Mail, User, PencilLine } from "lucide-react";

type Props = {
    payload: GmailPayload;
};

export default function GmailPreview({ payload }: Props) {
    return (
        <div className="space-y-6">
            {/* Recipient */}
            <section>
                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <User size={13} />
                    Recipient
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900">
                    {payload.to}
                </div>
            </section>

            {/* Subject */}

            <section>
                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <Mail size={13} />
                    Subject
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900">
                    {payload.subject}
                </div>
            </section>

            {/* Message */}

            <section>
                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <PencilLine size={13} />
                    Message
                </div>

                <div
                    className="
            max-h-72
            overflow-y-auto
            rounded-2xl
            bg-slate-50
            px-5
            py-4
            text-[15px]
            leading-7
            whitespace-pre-wrap
            text-slate-700
          "
                >
                    {payload.body}
                </div>
            </section>

        </div>
    );
}