import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GoogleButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function GoogleButton({
  children = "Continue with Google",
  className,
  ...props
}: GoogleButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-center gap-3",
        "rounded-xl border border-[#E7E2D6]",
        "bg-white px-4 py-3.5",
        "text-[15px] font-medium text-[#13294B]",
        "transition-all duration-200",
        "hover:bg-[#FCFBF8]",
        "focus-visible:outline-none",
        "focus-visible:ring-4 focus-visible:ring-[#A9822E]/15",
        className
      )}
      {...props}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        aria-hidden="true"
      >
        <path
          fill="#4285F4"
          d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.85 2.09-1.8 2.73v2.27h2.92c1.7-1.57 2.68-3.88 2.68-6.64z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.27c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.34C2.44 15.98 5.48 18 9 18z"
        />
        <path
          fill="#FBBC05"
          d="M3.97 10.7A5.4 5.4 0 0 1 3.68 9c0-.59.1-1.17.29-1.7V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3.01-2.34z"
        />
        <path
          fill="#EA4335"
          d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z"
        />
      </svg>

      {children}
    </button>
  );
}