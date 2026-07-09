import type { PendingAction } from "@repo/db/src/chat";
import { Mail, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";

type Props = {
    action: PendingAction;
};

const actionMeta = {
    gmail: {
        title: "Send Email",
        subtitle: "Review before sending",
        icon: Mail,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
    },

    calendar: {
        title: "Schedule Meeting",
        subtitle: "Review before scheduling",
        icon: Calendar,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600",
    },
} satisfies Record<
    PendingAction["tool"],
    {
        title: string;
        subtitle: string;
        icon: React.ElementType;
        iconBg: string;
        iconColor: string;
    }
>;

export default function ActionHeader({ action }: Props) {
    const meta = actionMeta[action.tool];

    const Icon = meta.icon;

    return (
        <div className="flex items-start justify-between px-6 py-5">
            <div className="flex items-center gap-4">

                <div
                    className={`
            flex h-12 w-12 items-center justify-center
            rounded-2xl
            ${meta.iconBg}
          `}
                >
                    <Icon
                        size={22}
                        className={meta.iconColor}
                    />
                </div>

                <div>
                    <h3 className="text-[16px] font-semibold text-slate-900">
                        {meta.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        {meta.subtitle}
                    </p>
                </div>

            </div>

            <StatusBadge status={action.status} />
        </div>
    );
}