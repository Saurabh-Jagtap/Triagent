import { Calendar as CalendarIcon } from "lucide-react";

type EventCardProps = {
  summary?: string;
  start?: string;
  end?: string;
};

function formatTime(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Derives a relative-time label purely from the existing start timestamp.
// No new fields required — just date comparison.
function getRelativeLabel(iso?: string): string | null {
  if (!iso) return null;
  const start = new Date(iso);
  if (isNaN(start.getTime())) return null;

  const now = new Date();
  const startDay = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffDays = Math.round(
    (startDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays > 1) return "Upcoming";
  return null; // past events: no badge
}

export function EventCard({ summary, start, end }: EventCardProps) {
  const relativeLabel = getRelativeLabel(start);
  const dateLabel = formatDate(start);
  const startTime = formatTime(start);
  const endTime = formatTime(end);

  const timeRange =
    startTime && endTime
      ? `${startTime} – ${endTime}`
      : startTime || "Time not set";

  return (
    <div className="group flex items-start gap-3 rounded-lg border border-[#D1D9E0] bg-white p-4 transition-all hover:border-[#BDD0DA] hover:shadow-sm">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#EAF2F8] text-[#2D4A5E]">
        <CalendarIcon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-[#1A2B35]">
            {summary || "Untitled event"}
          </span>
          {relativeLabel && (
            <span className="flex-shrink-0 rounded-full bg-[#EAF2F8] px-2 py-0.5 text-[10px] font-medium text-[#2D4A5E]">
              {relativeLabel}
            </span>
          )}
        </div>

        <p className="text-xs text-[#7A8B96]">
          {dateLabel ? `${dateLabel} · ` : ""}
          {timeRange}
        </p>
      </div>
    </div>
  );
}