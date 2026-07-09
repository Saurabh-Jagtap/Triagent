import type { TextMessage } from "@repo/db/src/chat";
import { User } from "lucide-react";

type Props = {
  message: TextMessage;
};

export default function TextMessage({
  message,
}: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-3xl flex-col gap-2 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {/* Sender */}

        <div className="flex items-center gap-2 px-1">
          {isUser ? (
            <>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm">
                <User size={14} />
              </div>

              <span className="text-xs font-medium text-slate-500">
                You
              </span>
            </>
          ) : (
            <>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF2F8] shadow-sm">
                <svg
                  width="18"
                  height="22"
                  viewBox="0 0 44 54"
                  fill="none"
                >
                  <rect
                    x="8"
                    y="16"
                    width="28"
                    height="24"
                    rx="8"
                    fill="#4A7FA0"
                  />
                  <circle
                    cx="17"
                    cy="27"
                    r="3.5"
                    fill="white"
                  />
                  <circle
                    cx="27"
                    cy="27"
                    r="3.5"
                    fill="white"
                  />
                  <path
                    d="M17 34 Q22 37.5 27 34"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <rect
                    x="20"
                    y="5"
                    width="4"
                    height="11"
                    rx="2"
                    fill="#2D4A5E"
                  />
                  <circle
                    cx="22"
                    cy="4"
                    r="3.5"
                    fill="#4A7FA0"
                  />
                  <rect
                    x="1"
                    y="20"
                    width="8"
                    height="4"
                    rx="2"
                    fill="#2D4A5E"
                  />
                  <rect
                    x="35"
                    y="20"
                    width="8"
                    height="4"
                    rx="2"
                    fill="#2D4A5E"
                  />
                </svg>
              </div>

              <span className="text-xs font-medium text-slate-500">
                Triagent
              </span>
            </>
          )}
        </div>

        {/* Message */}

        <div
          className={
            isUser
              ? `
                rounded-2xl
                rounded-tr-md
                bg-slate-900
                px-5
                py-3
                text-[15px]
                leading-7
                text-white
                shadow-sm
                whitespace-pre-wrap
              `
              : `
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
                text-[15px]
                leading-7
                text-slate-700
                shadow-sm
                whitespace-pre-wrap
              `
          }
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}