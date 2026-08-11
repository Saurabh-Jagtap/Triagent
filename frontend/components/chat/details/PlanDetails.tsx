import type { ExecutionPlan } from "@repo/db/src/schema";
import { Dispatch, SetStateAction } from "react";
import { formatDateTime } from "./date.utils";

type Props = {
  draft: ExecutionPlan;
  setDraft: Dispatch<SetStateAction<ExecutionPlan>>;
};

export default function PlanDetails({
  draft,
  setDraft,
}: Props) {

  switch (draft.task.operation) {

    case "compose":
      const execution = draft.execution;

      if (execution.tool !== "gmail" || execution.operation !== "compose") {
        return null;
      }

      return (
        <div className="space-y-4">

          <Detail
            label="Recipient"
            value={`${draft.task.recipientName} <${draft.task.recipientEmail}>`}

          />

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              Subject
            </p>

            <input
              value={execution.payload.subject}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  execution: {
                    ...execution,
                    payload: {
                      ...execution.payload,
                      subject: e.target.value,
                    },
                  },
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              Body
            </p>

            <textarea
              rows={10}
              value={execution.payload.body}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  execution: {
                    ...execution,
                    payload: {
                      ...execution.payload,
                      body: e.target.value,
                    },
                  },
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm resize-y"
            />
          </div>

        </div>
      );

    case "schedule": {
      const execution = draft.execution;

      if (execution.tool !== "calendar" || execution.operation !== "schedule") {
        return null;
      }

      return (
        <div className="space-y-4">

          <Detail
            label="Meeting"
            value={execution.payload.title}
          />

          <Detail
            label="Attendees"
            value={execution.payload.attendees.join(", ")}
          />

          <Detail
            label="Start Time"
            value={formatDateTime(execution.payload.startTime)}
          />

          <Detail
            label="End Time"
            value={formatDateTime(execution.payload.endTime)}
          />

        </div>
      );
    }

    default:
      return null;

  }

}

type DetailProps = {
  label: string;
  value: string;
};

function Detail({
  label,
  value,
}: DetailProps) {

  return (
    <div>

      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="text-sm text-slate-800">
        {value}
      </p>

    </div>
  );

}