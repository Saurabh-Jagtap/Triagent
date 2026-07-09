import type { PendingAction } from "@repo/db/src/chat";

import ActionHeader from "./actionCard/ActionHeader";
import ActionFooter from "./actionCard/ActionFooter";
import GmailPreview from "./actionCard/previews/GmailPreview";
import CalendarPreview from "./actionCard/previews/CalendarPreview";

type Props = {
    action: PendingAction;
    onApprove: (action: PendingAction) => void;
    onCancel: (action: PendingAction) => void;
};

export default function ActionCard({ action, onApprove, onCancel }: Props) {
    const renderPreview = () => {
        switch (action.tool) {
            case "gmail":
                return (
                    <GmailPreview
                        payload={action.payload}
                    />
                );

            case "calendar":
                return (
                    <CalendarPreview
                        payload={action.payload}
                    />
                );
        }
    };

    return (
        <div
            className="
        w-full
        max-w-[85%]
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-lg
        shadow-slate-900/5
        transition-all
        duration-200
      "
        >
            <ActionHeader action={action} />

            <div className="px-6 pb-6">
                {renderPreview()}
            </div>

            <ActionFooter
                action={action}
                onApprove={onApprove}
                onCancel={onCancel}
            />
        </div>
    );
}