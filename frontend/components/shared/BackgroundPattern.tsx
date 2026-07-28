import { cn } from "@/lib/utils";

interface BackgroundPatternProps {
  variant?: "hero" | "auth";
}

const variants = {
  hero: {
    glow:
      "left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 md:h-[800px] md:w-[800px]",

    outer:
      "right-[-110px] top-[-70px] h-[560px] w-[560px]",

    inner:
      "right-[-35px] top-[10px] h-[420px] w-[420px]",
  },

  auth: {
    glow:
      "left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2",

    outer:
      "left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2",

    inner:
      "left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2",
  },
} as const;

export default function BackgroundPattern({
  variant = "hero",
}: BackgroundPatternProps) {
  const current = variants[variant];

  return (
    <>
      {/* Glow */}
      <div
        className={cn(
          "pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(169,130,46,0.08),transparent_70%)]",
          current.glow
        )}
      />

      {/* Outer Ring */}
      <div
        className={cn(
          "pointer-events-none absolute hidden rounded-full border border-[#DDD6C1] lg:block",
          current.outer
        )}
      />

      {/* Inner Ring */}
      <div
        className={cn(
          "pointer-events-none absolute hidden rounded-full border border-[#E7DFC8] lg:block",
          current.inner
        )}
      />
    </>
  );
}