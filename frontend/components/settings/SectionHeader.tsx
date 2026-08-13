type SectionHeaderProps = {
  title: string;
  description: string;
};

export function SectionHeader({
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-3">
      <h2 className="text-[13px] font-medium text-[#1C2333]">
        {title}
      </h2>

      <p className="mt-0.5 text-[11.5px] text-[#8B93A3]">
        {description}
      </p>
    </div>
  );
}