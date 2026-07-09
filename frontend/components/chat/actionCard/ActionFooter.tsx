import type { PendingAction } from "@repo/db/src/chat";
import {
    Check,
    CheckCircle2,
    RotateCcw,
    X,
    XCircle,
} from "lucide-react";

type Props = {
    action: PendingAction;
    onApprove: (action: PendingAction) => void;
    onCancel: (action: PendingAction) => void;
};

export default function ActionFooter({ action, onApprove, onCancel }: Props) {
    switch (action.status) {
        case "pending":
            return (
                <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-5">

                    <button
                        onClick={() => onCancel(action)}
                        className="
              inline-flex
              h-10
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              text-sm
              font-medium
              text-slate-700
              transition-all
              hover:bg-slate-50
            "
                    >
                        <X size={16} />
                        Cancel
                    </button>

                    <button
                        onClick={() => onApprove(action)}
                        className="
              inline-flex
              h-10
              items-center
              gap-2
              rounded-xl
              bg-slate-900
              px-5
              text-sm
              font-medium
              text-white
              transition-all
              hover:bg-slate-800
              hover:shadow-lg
            "
                    >
                        <Check size={16} />
                        Approve
                    </button>

                </div>
            );

        case "approved":
            return (
                <StatusRow
                    icon={<CheckCircle2 size={18} />}
                    text="Waiting for execution..."
                    className="text-blue-600"
                />
            );

        case "completed":
            return (
                <StatusRow
                    icon={<CheckCircle2 size={18} />}
                    text="Successfully completed"
                    className="text-emerald-600"
                />
            );

        case "cancelled":
            return (
                <StatusRow
                    icon={<XCircle size={18} />}
                    text="Action cancelled"
                    className="text-slate-500"
                />
            );

        case "failed":
            return (
                <div className="flex items-center justify-between border-t border-slate-100 px-6 py-5">

                    <div className="flex items-center gap-2 text-sm font-medium text-red-600">
                        <XCircle size={18} />
                        Failed to execute
                    </div>

                    <button
                        onClick={() => onApprove(action)}
                        className="
              inline-flex
              h-10
              items-center
              gap-2
              rounded-xl
              bg-slate-900
              px-4
              text-sm
              font-medium
              text-white
              transition-all
              hover:bg-slate-800
            "
                    >
                        <RotateCcw size={15} />
                        Retry
                    </button>

                </div>
            );
    }
}

type StatusRowProps = {
    icon: React.ReactNode;
    text: string;
    className?: string;
};

function StatusRow({ icon, text, className }: StatusRowProps) {
    return (
        <div
            className={`
        flex
        items-center
        gap-2
        border-t
        border-slate-100
        px-6
        py-5
        text-sm
        font-medium
        ${className}
      `}
        >
            {icon}

            <span>{text}</span>
        </div>
    );
}