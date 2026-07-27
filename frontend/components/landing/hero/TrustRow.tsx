import {
  Calendar,
  CheckCircle2,
  Mail,
} from "lucide-react";

export function TrustRow() {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-[#5B5F72]">
      <div className="flex items-center gap-2">
        <CheckCircle2
          className="h-4 w-4 text-[#A9822E]"
          strokeWidth={2}
        />
        <span>Human approval required</span>
      </div>

      <div className="flex items-center gap-2">
        <Mail
          className="h-4 w-4 text-[#A9822E]"
          strokeWidth={2}
        />
        <span>Works with Gmail</span>
      </div>

      <div className="flex items-center gap-2">
        <Calendar
          className="h-4 w-4 text-[#A9822E]"
          strokeWidth={2}
        />
        <span>Google Calendar</span>
      </div>
    </div>
  );
}