import { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  action?: ReactNode;
}

export default function AuthInput({
  label,
  action,
  className,
  id,
  ...props
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#9BA1AC]"
        >
          {label}
        </label>

        {action}
      </div>

      <input
        id={id}
        className={cn(
          "w-full rounded-xl border border-[#E7E2D6] bg-white px-4 py-3.5 text-[15px] text-[#13294B] outline-none transition-all",
          "placeholder:text-[#9BA1AC]",
          "focus:border-[#A9822E] focus:ring-4 focus:ring-[#A9822E]/15",
          className
        )}
        {...props}
      />
    </div>
  );
}