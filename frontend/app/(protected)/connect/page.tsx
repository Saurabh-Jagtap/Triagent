"use client";

import { Calendar, Mail, ShieldCheck } from "lucide-react";

const ConnectPage = () => {
  const connectGmail = () => {
    window.location.href = "/api/connect/gmail";
  };

  const connectCalendar = () => {
    window.location.href = "/api/connect/calendar";
  };

  return (
    <div className="min-h-full bg-[#F4F6F7]">
      <div className="mx-auto max-w-2xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-[#1A2B35]">
            Connections
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#4A5568]">
            Connect your tools to enable AI-powered email and calendar
            assistance.
          </p>
        </div>

        {/* Connection cards */}
        <div className="space-y-4">
          {/* Gmail */}
          <div className="rounded-xl border border-[#D1D9E0] bg-white p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FCEBEB]">
                <Mail className="h-5 w-5 text-[#EA4335]" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-medium text-[#1A2B35]">
                  Gmail
                </h2>
                <p className="mt-0.5 text-xs leading-relaxed text-[#7A8B96]">
                  Allow Triagent to access and organize your email.
                </p>
              </div>

              <button
                onClick={connectGmail}
                className="flex-shrink-0 rounded-lg bg-[#2D4A5E] px-4 py-2 text-xs font-medium text-[#F4F6F7] transition-colors hover:bg-[#1A2B35]"
              >
                Connect Gmail
              </button>
            </div>
          </div>

          {/* Google Calendar */}
          <div className="rounded-xl border border-[#D1D9E0] bg-white p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#E6F1FB]">
                <Calendar className="h-5 w-5 text-[#185FA5]" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-medium text-[#1A2B35]">
                  Google Calendar
                </h2>
                <p className="mt-0.5 text-xs leading-relaxed text-[#7A8B96]">
                  Allow Triagent to access your meetings and schedule.
                </p>
              </div>

              <button
                onClick={connectCalendar}
                className="flex-shrink-0 rounded-lg bg-[#2D4A5E] px-4 py-2 text-xs font-medium text-[#F4F6F7] transition-colors hover:bg-[#1A2B35]"
              >
                Connect Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Trust note */}
        <div className="mt-6 flex items-start gap-2 text-xs text-[#7A8B96]">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#4A7FA0]" />
          <span>
            Triagent only requests the access needed to summarize and
            organize your inbox and calendar.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;