import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardShellProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function CardShell({
  children,
  className,
  dark = false,
}: CardShellProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        dark
          ? "border-0 bg-[linear-gradient(160deg,#1C355E_0%,#13294B_65%,#0F1E38_100%)] shadow-[0_40px_70px_-30px_rgba(16,25,45,0.55)]"
          : "border border-[#13294B]/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#FCFBF8_100%)] shadow-[0_30px_55px_-30px_rgba(19,41,75,0.30)]",
        className
      )}
    >
      {children}
    </div>
  );
}