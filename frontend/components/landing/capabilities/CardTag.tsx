interface CardTagProps {
  label: string;
  dark?: boolean;
}

export function CardTag({ label, dark = false }: CardTagProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] ${
        dark ? "text-[#A9822E]" : "text-[#7F621F]"
      }`}
    >
      {dark && <span>✦</span>}
      {label}
    </span>
  );
}