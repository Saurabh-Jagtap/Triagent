import { cn } from "@/lib/utils";

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function AuthButton({
  className,
  children,
  ...props
}: AuthButtonProps) {
  return (
    <button
      className={cn(
        "mt-2 w-full rounded-xl bg-[#13294B] py-3.5 text-[15px] font-semibold text-[#F8F6F2]",
        "transition-all duration-200",
        "hover:opacity-95 hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A9822E]/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}