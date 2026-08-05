import { ExecutionPlan } from "@repo/db/src/schema";
import PlanDetails from "./details/PlanDetails";

type Props = {
  plan: ExecutionPlan;
  onApprove: (plan: ExecutionPlan) => void;
  onCancel: () => void;
};

export default function ApprovalCard({
  plan,
  onApprove,
  onCancel,
}: Props) {

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 px-6 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
          Ready for Approval
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-900">
          {getTitle(plan)}
        </h3>
      </div>

      <div className="space-y-5 px-6 py-5">

        <PlanDetails plan={plan} />

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm leading-6 text-slate-700">
            {plan.reply}
          </p>
        </div>

      </div>

      <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

        <button
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          onClick={() => onApprove(plan)}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Approve
        </button>

      </div>

    </div>
  );
}

function getTitle(plan: ExecutionPlan) {

  switch (plan.task.operation) {

    case "compose":
      return "Send Email";

    case "reply":
      return "Reply to Email";

    case "schedule":
      return "Schedule Meeting";

    case "summarize":
      return "Summarize Inbox";

    default:
      return "Pending Action";
  }

}
