type BriefItemProps = {
  title: string;
  subtitle?: string;
  active?: boolean;
};

export function BriefItem({
  title,
  subtitle,
  active = true,
}: BriefItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`mt-2 h-2 w-2 rounded-full ${
          active ? "bg-[#A9822E]" : "bg-[#49506A]"
        }`}
      />

      <div>
        <p className="text-[15px] leading-6 text-[#F6F4EE]">
          {title}
        </p>

        {subtitle && (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#8B8F9F]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}