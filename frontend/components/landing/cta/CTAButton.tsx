import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
}

export default function CTAButton({
  children,
}: CTAButtonProps) {
  return (
    <button
      className="
        inline-flex
        items-center
        gap-2.5

        rounded-full

        bg-gradient-to-b
        from-[#1B3258]
        to-[#13294B]

        px-7
        py-4

        text-[15px]
        font-semibold
        text-[#F8F6F2]

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:shadow-[0_32px_52px_-20px_rgba(19,41,75,0.55)]

        shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(169,130,46,0.18),0_24px_40px_-18px_rgba(19,41,75,0.45)]
      "
    >
      {children}

      <ArrowRight size={17} strokeWidth={2} />
    </button>
  );
}