export function NextUp() {
  return (
    <section>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[#7B8198]">
        Next Up
      </p>

      <div className="flex justify-between gap-6">
        <div>
          <p className="font-mono text-xs text-[#A9822E]">
            10:00
          </p>

          <p className="mt-1 text-sm text-[#F6F4EE]">
            1:1 with Alex
          </p>
        </div>

        <div>
          <p className="font-mono text-xs text-[#A9822E]">
            11:30
          </p>

          <p className="mt-1 text-sm text-[#F6F4EE]">
            Board Sync
          </p>
        </div>
      </div>
    </section>
  );
}