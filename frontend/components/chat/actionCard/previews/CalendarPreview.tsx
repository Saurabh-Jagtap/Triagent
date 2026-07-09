import type { CalendarPayload } from "@repo/db/src/chat";
import {
    CalendarDays,
    Clock3,
    UserRound,
    Users,
} from "lucide-react";

type Props = {
    payload: CalendarPayload;
};

export default function CalendarPreview({ payload }: Props) {
    const start = new Date(payload.startTime);
    const end = new Date(payload.endTime);

    const date = start.toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const time = `${start.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    })} – ${end.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    })}`;

    return (
        <div className="space-y-6">
            {/* Meeting Title */}
            <section>
                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <CalendarDays size={13} />
                    Meeting
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900">
                    {payload.title}
                </div>
            </section>

            {/* Date & Time */}

            <section className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-slate-50 p-4">

                    <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        <CalendarDays size={13} />
                        Date
                    </div>

                    <p className="text-sm font-medium text-slate-900">
                        {date}
                    </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-4">

                    <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        <Clock3 size={13} />
                        Time
                    </div>

                    <p className="text-sm font-medium text-slate-900">
                        {time}
                    </p>

                </div>

            </section>

            {/* Guests */}

            <section>

                <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <Users size={13} />
                    Guests
                </div>

                <div className="space-y-2">

                    {payload.attendees.map((email) => (
                        <div
                            key={email}
                            className="
                flex
                items-center
                gap-3
                rounded-xl
                bg-slate-50
                px-4
                py-3
              "
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                                <UserRound
                                    size={16}
                                    className="text-slate-500"
                                />
                            </div>

                            <span className="text-sm font-medium text-slate-900">
                                {email}
                            </span>

                        </div>
                    ))}

                </div>

            </section>

        </div>
    );
}