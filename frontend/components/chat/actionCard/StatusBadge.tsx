import type { ActionStatus } from "@repo/db/src/chat";
import {
    CheckCircle2,
    Clock3,
    CircleX,
    AlertTriangle,
} from "lucide-react";

type Props = {
    status: ActionStatus;
};

const statusConfig = {
    pending: {
        label: "Pending",
        icon: Clock3,
        className:
            "bg-amber-50 text-amber-700 border border-amber-200",
    },

    approved: {
        label: "Approved",
        icon: CheckCircle2,
        className:
            "bg-blue-50 text-blue-700 border border-blue-200",
    },

    completed: {
        label: "Completed",
        icon: CheckCircle2,
        className:
            "bg-emerald-50 text-emerald-700 border border-emerald-200",
    },

    cancelled: {
        label: "Cancelled",
        icon: CircleX,
        className:
            "bg-slate-100 text-slate-600 border border-slate-200",
    },

    failed: {
        label: "Failed",
        icon: AlertTriangle,
        className:
            "bg-red-50 text-red-700 border border-red-200",
    },
} satisfies Record<
    ActionStatus,
    {
        label: string;
        icon: React.ElementType;
        className: string;
    }
>;

export default function StatusBadge({status}: Props) {
    const config = statusConfig[status];

    const Icon = config.icon;

    return (
        <div
            className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${config.className}
      `}
        >
            <Icon size={14} />

            <span>{config.label}</span>
        </div>
    );
}