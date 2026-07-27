export function PlanningCard() {
  const steps = [
    "Finds Sarah",
    "Checks calendar",
    "Detects scheduling conflicts",
    "Preparing invitation...",
  ];

  return (
    <div
      className="
        w-[340px]
        rotate-1
        rounded-2xl
        bg-gradient-to-br
        from-[#1C355E]
        via-[#13294B]
        to-[#0F1E38]
        p-9
        shadow-[0_40px_70px_-28px_rgba(19,41,75,0.42)]
      "
    >
      <div className="mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#A9822E]">
          ✦ Preparing Actions
        </span>
      </div>

      <ul className="space-y-5">
        {steps.map((step, index) => (
          <li
            key={step}
            className="flex items-center gap-3 text-sm text-white/90"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                index === steps.length - 1
                  ? "bg-white/30"
                  : "bg-[#A9822E]"
              }`}
            />

            <span
              className={
                index === steps.length - 1
                  ? "text-white/60"
                  : ""
              }
            >
              {step}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}