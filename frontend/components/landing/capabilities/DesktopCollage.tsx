import { InboxCard } from "./cards/InboxCard";
import { CalendarCard } from "./cards/CalendarCard";
import { MeetingPrepCard } from "./cards/MeetingPrepCard";
import { ResearchCard } from "./cards/ResearchCard";
import { FollowUpCard } from "./cards/FollowUpCard";
import { DailyBriefCard } from "./cards/DailyBriefCard";
import { FloatingFleck } from "./FloatingFleck";

export function DesktopCollage() {
  return (
    <div className="
relative
mx-auto
mt-20
h-[980px]
max-w-[360px]

md:mt-24
md:h-[900px]
md:max-w-[700px]

lg:mt-28
lg:h-[760px]
lg:max-w-[1100px]
">
            <FloatingFleck className="left-[22%] top-[8%]" />
            <FloatingFleck className="left-[62%] top-[26%]" />
            <FloatingFleck className="left-[36%] top-[60%]" />
            <FloatingFleck className="left-[78%] top-[82%]" />

            {/* Inbox */}
            <div className="absolute left-[0%] top-[18%] md:left-[4%] md:top-[10%] lg:left-[6%] lg:top-[12%] rotate-[-5deg] z-20">
                <InboxCard />
            </div>

            {/* Calendar */}
            <div className="absolute right-[0%] top-[0%] md:right-[2%] md:top-[2%] lg:right-[8%] lg:top-[6%] rotate-[4deg] z-20">
                <CalendarCard />
            </div>

            {/* Meeting Prep */}
            <div className="absolute left-[8%] top-[30%] md:left-[22%] md:top-[22%] lg:left-[30%] lg:top-[16%] z-30">
                <MeetingPrepCard />
            </div>

            {/* Research */}
            <div className="absolute right-[0%] top-[64%] md:right-[4%] md:top-[54%] lg:right-[1%] lg:top-[50%] rotate-[-3deg] z-10">
                <ResearchCard />
            </div>

            {/* Daily Brief */}
            <div className="absolute left-[6%] top-[76%] md:left-[6%] md:top-[72%] lg:left-[14%] lg:top-[70%] rotate-[-4deg] z-10">
                <DailyBriefCard />
            </div>

            {/* Follow-up */}
            <div className="absolute right-[2%] top-[82%] md:right-[12%] md:top-[76%] lg:right-[22%] lg:top-[72%] rotate-[2deg] z-20">
                <FollowUpCard />
            </div>
        </div>
  );
}