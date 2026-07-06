import { PendingAction } from "@repo/db/src/chat";
import { Mail, Check, X } from "lucide-react";
import GmailPreview from "./actions/GmailPreview";
import CalendarPreview from "./actions/CalendarPreview";

type Props = {
    action: PendingAction;
    onApprove: (action: PendingAction) => void;
    onCancel: (action: PendingAction) => void;
};


export default function ActionCard({ action, onApprove, onCancel }: Props) {
    const isPending = action.status === "pending";
    const isApproved = action.status === "approved";
    const isCompleted = action.status === "completed";
    const isFailed = action.status === "failed";
    const isCancelled = action.status === "cancelled";

    const renderPreview = () => {
        switch (action.tool) {
            case "gmail":
                return (
                    <GmailPreview payload={action.payload} />
                );

            case "calendar":
                return (
                    <CalendarPreview payload={action.payload} />
                );
        }
    };
    return (
        <div className="w-full max-w-xl rounded-2xl border border-[#D1D9E0] bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#E8ECF0] px-5 py-4">
                <div className="h-10 w-10 rounded-xl bg-[#EAF2F8] flex items-center justify-center">
                    <Mail
                        className="text-[#2D4A5E]"
                        size={18}
                    />
                </div>
                <div>
                    <h3 className="font-medium">
                        Email Draft
                    </h3>

                    <p className="text-xs text-[#7A8B96]">
                        Review before sending
                    </p>
                </div>
            </div>

            {/* Preview */}
            <div className="p-5">
                {renderPreview()}
            </div>

            {/* Footer */}
            <div className="border-t border-[#E8ECF0] p-4">

                {isPending && (
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => onCancel(action)}
                            className="flex items-center gap-2 rounded-lg border border-[#D1D9E0] px-4 py-2 text-sm hover:bg-[#F8FAFB]"
                        >
                            <X size={16} />
                            Cancel
                        </button>

                        <button
                            onClick={() => onApprove(action)}
                            className="flex items-center gap-2 rounded-lg bg-[#2D4A5E] px-4 py-2 text-sm text-white hover:bg-[#243B4D]"
                        >
                            <Check size={16} />
                            Approve
                        </button>

                    </div>
                )}

                {isApproved && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                        <Check size={18} />
                        <span>
                            Approved
                        </span>
                    </div>
                )}

                {isCompleted && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                        <Check size={18} />
                        <span>
                            Completed
                        </span>
                    </div>
                )}

                {isCancelled && (
                    <div className="flex items-center gap-2 text-sm text-[#7A8B96]">
                        <X size={18} />
                        <span>
                            Action cancelled
                        </span>
                    </div>
                )}

                {isFailed && (
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-red-600">
                            Failed to execute.
                        </span>
                        <button
                            onClick={() => onApprove(action)}
                            className="rounded-lg bg-[#2D4A5E] px-4 py-2 text-sm text-white"
                        >
                            Retry
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}