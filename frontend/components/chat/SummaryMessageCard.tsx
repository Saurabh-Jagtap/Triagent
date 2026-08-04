import type { SummaryMessage } from "@repo/db/src/chat";

type Props = {
  message: SummaryMessage;
};

export default function SummaryMessageCard({
  message,
}: Props) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">
        {message.summary.title}
      </h3>

      <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
        {message.summary.content}
      </p>
    </div>
  );

}