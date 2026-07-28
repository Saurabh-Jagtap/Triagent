interface AuthDividerProps {
  text?: string;
}

export default function AuthDivider({
  text = "or",
}: AuthDividerProps) {
  return (
    <div className="my-4 flex items-center gap-4">
      <div className="h-px flex-1 bg-[#E7E2D6]" />

      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#9BA1AC]">
        {text}
      </span>

      <div className="h-px flex-1 bg-[#E7E2D6]" />
    </div>
  );
}