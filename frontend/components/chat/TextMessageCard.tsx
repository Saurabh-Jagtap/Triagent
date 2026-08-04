import type { TextMessage } from "@repo/db/src/chat";
import { User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  message: TextMessage;
};

export default function TextMessageCard({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      <div
        className={`flex max-w-4xl flex-col gap-2 ${isUser ? "items-end" : "items-start"
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
      `
          }
        >
          {isUser ? (
            <div className="whitespace-pre-wrap">
              {message.content}
            </div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="mt-5 mb-3 text-lg font-semibold text-slate-900 first:mt-0">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mt-4 mb-2 text-base font-semibold text-slate-800">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-3 last:mb-0">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-4 list-disc space-y-1 pl-5">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-4 list-decimal space-y-1 pl-5">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li>{children}</li>
                ),

                strong: ({ children }) => (
                  <strong className="font-semibold text-slate-900">
                    {children}
                  </strong>
                ),

                hr: () => (
                  <hr className="my-4 border-slate-200" />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}