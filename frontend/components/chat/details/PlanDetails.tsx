import type { AssistantPlan } from "@repo/db/src/schema";

type Props = {
  plan: AssistantPlan;
};

export default function PlanDetails({
  plan,
}: Props) {

  switch (plan.task.operation) {

    case "compose":

      return (
        <div className="space-y-4">

          <Detail
            label="Recipient"
            value={`${plan.task.recipientName} <${plan.task.recipientEmail}>`}
          />

          {plan.task.purpose && (
            <Detail
              label="Purpose"
              value={plan.task.purpose}
            />
          )}

        </div>
      );

    case "schedule":

      return (
        <div className="space-y-4">

          <Detail
            label="Attendees"
            value={plan.task.attendeeNames?.join(", ") ?? "-"}
          />

          <Detail
            label="Start Time"
            value={plan.task.startTime ?? "-"}
          />

        </div>
      );

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