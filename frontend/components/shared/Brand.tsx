import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandProps {
  href?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}

export default function Brand({
  href = "/",
  className,
  textClassName,
  iconClassName,
}: BrandProps) {
  return (
    <Link
      href={href}
      aria-label="Triagent Home"
      className={cn(
        "inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-90",
        className
      )}
    >
      <div className={cn("shrink-0", iconClassName)}>
        <svg
          width="28"
          height="38"
          viewBox="0 0 44 54"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="8"
            y="16"
            width="28"
            height="24"
            rx="8"
            fill="#13294B"
          />

          <circle
            cx="17"
            cy="27"
            r="3.5"
            fill="white"
          />

          <circle
            cx="27"
            cy="27"
            r="3.5"
            fill="white"
          />

          <path
            d="M17 34 Q22 37.5 27 34"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          <rect
            x="20"
            y="5"
            width="4"
            height="11"
            rx="2"
            fill="#2D4A5E"
          />

          <circle
            cx="22"
            cy="4"
            r="3.5"
            fill="#4A7FA0"
          />

          <rect
            x="1"
            y="20"
            width="8"
            height="4"
            rx="2"
            fill="#2D4A5E"
          />

          <rect
            x="35"
            y="20"
            width="8"
            height="4"
            rx="2"
            fill="#2D4A5E"
          />
        </svg>
      </div>

      <span
        className={cn(
          "font-newsreader text-[22px] font-medium tracking-[-0.02em] text-[#13294B]",
          textClassName
        )}
      >
        Triagent
      </span>
    </Link>
  );
}