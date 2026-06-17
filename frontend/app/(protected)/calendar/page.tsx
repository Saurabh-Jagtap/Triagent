"use client";

import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { EventCard } from "@/components/calendar/EventCard";
import { useEvents } from "@/hooks/useEvents";

function EventSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[#E8ECF0] bg-white p-4">
      <div className="h-9 w-9 flex-shrink-0 animate-pulse rounded-full bg-[#E8ECF0]" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="h-3 w-40 animate-pulse rounded bg-[#E8ECF0]" />
          <div className="h-3 w-12 animate-pulse rounded bg-[#E8ECF0]" />
        </div>
        <div className="h-3 w-1/3 animate-pulse rounded bg-[#E8ECF0]" />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <EventSkeleton key={i} />
      ))}
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-[#E8ECF0] bg-white py-16 text-center">
      <p className="text-sm font-medium text-[#1A2B35]">
        Failed to load events
      </p>
      <p className="mt-1 text-xs text-[#7A8B96]">
        Something went wrong while fetching your calendar.
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-[#E8ECF0] bg-white py-16 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2F8]">
        <CalendarIcon className="h-5 w-5 text-[#4A7FA0]" />
      </div>
      <p className="text-sm font-medium text-[#1A2B35]">
        Your calendar is clear
      </p>
      <p className="mt-1 text-xs text-[#7A8B96]">
        New meetings and events will show up here.
      </p>
    </div>
  );
}

const CalendarPage = () => {
  const { data, isLoading, error } = useEvents();

  const events = data?.data?.items ?? [];

  return (
    <div className="min-h-full bg-[#F4F6F7]">
      <div className="mx-auto max-w-5xl px-6 py-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between rounded-lg border border-[#D1D9E0] bg-white px-5 py-4">
          <div>
            <h1 className="text-xl font-medium text-[#1A2B35]">Calendar</h1>
            <p className="mt-0.5 text-xs text-[#7A8B96]">
              Your upcoming meetings and events
            </p>
          </div>

          <button className="flex items-center gap-1.5 rounded-lg bg-[#2D4A5E] px-4 py-2 text-sm font-medium text-[#F4F6F7] transition-colors hover:bg-[#1A2B35]">
            <Plus className="h-4 w-4" />
            Create Meeting
          </button>
        </div>

        {/* Event list */}
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : events.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {events.map((event: any) => (
              <EventCard
                key={event.id}
                summary={event.summary}
                start={event.start?.dateTime}
                end={event.end?.dateTime}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;