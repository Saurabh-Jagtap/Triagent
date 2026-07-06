import type { CalendarPayload } from "@repo/db/src/chat";

type Props = {
    payload: CalendarPayload;
};

export default function CalendarPreview({ payload }: Props) {
    return (
        <div className="space-y-4 text-sm">

            <div>
                <p className="text-[#7A8B96]">
                    Title
                </p>

                <p className="font-medium">
                    {payload.title}
                </p>
            </div>

            <div>
                <p className="text-[#7A8B96]">
                    Attendees
                </p>

                <div className="space-y-1">
                    {payload.attendees.map((email) => (
                        <div key={email}>
                            {email}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>
                    <p className="text-[#7A8B96]">
                        Starts
                    </p>

                    <p>
                        {new Date(
                            payload.startTime
                        ).toLocaleString()}
                    </p>
                </div>

                <div>
                    <p className="text-[#7A8B96]">
                        Ends
                    </p>

                    <p>
                        {new Date(
                            payload.endTime
                        ).toLocaleString()}
                    </p>
                </div>

            </div>

        </div>
    );
}