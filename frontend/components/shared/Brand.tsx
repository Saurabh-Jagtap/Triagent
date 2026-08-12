import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandVariant = "default" | "reversed" | "mono";
type BrandSize = "sm" | "md" | "lg";

interface BrandMarkProps {
  variant?: BrandVariant;
  size?: BrandSize;
  className?: string;
}

interface BrandProps extends BrandMarkProps {
  href?: string;
  iconOnly?: boolean;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}

const ICON_DIMENSIONS: Record<BrandSize, { width: number; height: number }> = {
  sm: { width: 22, height: 27 },
  md: { width: 28, height: 38 },
  lg: { width: 36, height: 44 },
};

const TEXT_SIZE: Record<BrandSize, string> = {
  sm: "text-[16px]",
  md: "text-[22px]",
  lg: "text-[28px]",
};

const COLORS: Record<BrandVariant, { bar: string; dot: string; text: string }> = {
  default: { bar: "#13294B", dot: "#A9812F", text: "text-[#13294B]" },
  reversed: { bar: "#F8F4EA", dot: "#A9812F", text: "text-[#F8F4EA]" },
  mono: { bar: "currentColor", dot: "currentColor", text: "text-current" },
};

export function BrandMark({
  variant = "default",
  size = "md",
  className,
}: BrandMarkProps) {
  const { width, height } = ICON_DIMENSIONS[size];
  const { bar, dot } = COLORS[variant];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 54"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <rect x="8" y="8" width="28" height="5" rx="2.5" fill={bar} />
      <rect x="12" y="20" width="20" height="5" rx="2.5" fill={bar} />
      <rect x="16" y="32" width="12" height="5" rx="2.5" fill={bar} />
      <circle cx="22" cy="46" r="4.5" fill={dot} />
    </svg>
  );
}

export default function Brand({
  href = "/",
  variant = "default",
  size = "md",
  iconOnly = false,
  className,
  textClassName,
  iconClassName,
}: BrandProps) {
  const { text } = COLORS[variant];

  return (
    <Link
      href={href}
      aria-label="Triagent Home"
      className={cn(
        "inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-90",
        className
      )}
    >
      <BrandMark variant={variant} size={size} className={iconClassName} />

      {!iconOnly && (
        <span
          className={cn(
            "font-newsreader font-medium tracking-[-0.02em]",
            TEXT_SIZE[size],
            text,
            textClassName
          )}
        >
          Triagent
        </span>
      )}
    </Link>
  );
}