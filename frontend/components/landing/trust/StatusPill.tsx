interface StatusPillProps {
  children: React.ReactNode;
}

export default function StatusPill({ children }: StatusPillProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#A9822E]/40 px-3 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-[#A9822E] shadow-[0_0_8px_rgba(169,130,46,0.55)]" />

      <span className="text-[12px] font-medium text-[#7F621F]">
        {children}
      </span>
    </div>
  );
}