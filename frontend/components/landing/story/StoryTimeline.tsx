import { ApprovalCard } from "./ApprovalCard";
import { PlanningCard } from "./PlanningCard";
import { RequestCard } from "./RequestCard";
import { StoryConnector } from "./StoryConnector";
import { SuccessState } from "./SuccessState";

export function StoryTimeline() {
    return (
        <StoryConnector>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_40px_80px_1fr] items-center">
                <div className="justify-self-center md:justify-self-end">
                    <RequestCard />
                </div>

                <div className="hidden md:block border-t border-dashed border-[#13294B]/35"/>

                <div className="flex justify-center">
                    <div className="h-3 w-3 rounded-full border-2 border-[#13294B]/40 bg-[#F8F6F2]" />
                </div>

                <div />

                <div />
            </div>

            <div className="mt-36 grid grid-cols-1 md:grid-cols-[1fr_80px_40px_80px_1fr] items-center">
                <div />

                <div />

                <div className="flex justify-center">
                    <div className="h-3 w-3 rounded-full border-2 border-[#13294B]/40 bg-[#F8F6F2]" />
                </div>

                <div className="hidden md:block border-t border-dashed border-[#13294B]/35"/>

                <div className="justify-self-start">
                    <PlanningCard />
                </div>
            </div>

            <div className="mt-36 md:mt-0 grid grid-cols-1 md:grid-cols-[1fr_80px_40px_80px_1fr] items-center">
                <div className="justify-self-center md:justify-self-end">
                    <ApprovalCard />
                </div>

                <div className="hidden md:block border-t border-dashed border-[#13294B]/35"/>

                <div className="flex justify-center">
                    <div className="h-3 w-3 rounded-full border-2 border-[#13294B]/40 bg-[#F8F6F2]" />
                </div>

                <div />

                <div />
            </div>

            <div className="mt-24 flex flex-col items-center">
                {/* Final connector */}
                <div className="mb-8 h-16 border-l-2 border-dashed border-[#13294B]/35" />

                <SuccessState />
            </div>
        </StoryConnector>
    );
}