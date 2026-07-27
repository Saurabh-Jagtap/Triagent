import { InboxCard } from "./cards/InboxCard";
import { CalendarCard } from "./cards/CalendarCard";
import { MeetingPrepCard } from "./cards/MeetingPrepCard";
import { ResearchCard } from "./cards/ResearchCard";
import { FollowUpCard } from "./cards/FollowUpCard";
import { DailyBriefCard } from "./cards/DailyBriefCard";

export function MobileCollage() {
  return (
    <div className="mx-auto mt-16 max-w-sm px-4">

      <div className="grid grid-cols-2 gap-x-3 gap-y-10">

        {/* Calendar */}
        <div className="justify-self-end translate-x-2 rotate-[6deg]">
          <CalendarCard />
        </div>

        {/* Inbox */}
        <div className="translate-y-16 -translate-x-2 rotate-[-7deg]">
          <InboxCard />
        </div>

        {/* Hero */}
        <div className="col-span-2 mt-12 flex justify-center">
          <MeetingPrepCard />
        </div>

        {/* Research */}
        <div className="translate-y-12 -translate-x-3 rotate-[-5deg]">
          <ResearchCard />
        </div>

        {/* Draft */}
        <div className="justify-self-end translate-y-4 translate-x-2 rotate-[4deg]">
          <FollowUpCard />
        </div>

        {/* Daily */}
        <div className="col-span-2 mt-16 flex justify-start pl-8 rotate-[-6deg]">
          <DailyBriefCard />
        </div>

      </div>

    </div>
  );
}