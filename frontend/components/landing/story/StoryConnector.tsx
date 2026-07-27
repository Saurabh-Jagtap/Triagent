import { ReactNode } from "react";

type StoryConnectorProps = {
  children: ReactNode;
};

export function StoryConnector({ children }: StoryConnectorProps) {
  return (
    <div className="relative mx-auto mt-24 max-w-6xl">
      {/* Timeline */}
      <div
        aria-hidden
        className="absolute hidden md:block left-1/2 top-0 bottom-16 -translate-x-1/2"
      >
        <div className="h-full border-l-2 border-dashed border-[#13294B]/35" />
      </div>

      {children}
    </div>
  );
}