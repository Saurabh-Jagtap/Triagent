import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizes;
}

const sizes = {
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-md lg:max-w-2xl",
} as const;

export default function AuthCard({
  children,
  className,
  size = "md",
}: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-[#E8E2D9] bg-white shadow-sm",
        "p-5 sm:p-6 lg:p-8",
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  );
}