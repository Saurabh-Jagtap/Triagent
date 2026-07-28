interface PrincipleCardProps {
  title: string;
  description: string;
}

export default function PrincipleCard({
  title,
  description,
}: PrincipleCardProps) {
  return (
    <div className="border-t border-[#13294B]/10 pt-5">
      <h3 className="font-newsreader text-[22px] font-medium italic text-[#13294B]">
        {title}
      </h3>

      <p className="mt-3 max-w-[220px] text-[15px] leading-7 text-[#5B6472]">
        {description}
      </p>
    </div>
  );
}