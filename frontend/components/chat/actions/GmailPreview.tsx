import { GmailPayload } from "@repo/db/src/chat";

type Props = {
    payload: GmailPayload;
};

export default function GmailPreview({
    payload,
}: Props) {
    return (
        <div className="space-y-4">

            <div>
                <p className="text-xs font-medium text-[#7A8B96]">
                    To
                </p>

                <p className="text-sm text-[#1A2B35]">
                    {payload.to}
                </p>
            </div>

            <div>
                <p className="text-xs font-medium text-[#7A8B96]">
                    Subject
                </p>

                <p className="text-sm text-[#1A2B35]">
                    {payload.subject}
                </p>
            </div>

            <div className="rounded-xl border bg-[#FAFBFC]">

                <div className="border-b px-4 py-2">
                    <span className="text-xs text-gray-500">
                        Message Preview
                    </span>
                </div>

                <div
                    className="
            max-h-52
            overflow-y-auto
            p-4
            whitespace-pre-wrap
        "
                >
                    {payload.body}
                </div>

            </div>

        </div>
    );
}