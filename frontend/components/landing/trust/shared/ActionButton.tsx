import { cn } from "@/lib/utils";

interface ActionButtonProps {
  variant: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

export default function ActionButton({
  variant,
  children,
}: ActionButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg text-[13px] font-medium transition-all",

        variant === "primary" &&
          "bg-gradient-to-b from-[#BE9640] to-[#A9822E] px-6 py-2.5 text-[#241B04] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_14px_26px_-12px_rgba(169,130,46,0.65)]",

        variant === "secondary" &&
          "border border-[#13294B]/15 px-5 py-2.5 text-[#13294B] hover:bg-[#13294B]/5",

        variant === "ghost" &&
          "px-2 py-2.5 text-[#9BA1AC] hover:text-[#13294B]"
      )}
    >
      {children}
    </button>
  );
}