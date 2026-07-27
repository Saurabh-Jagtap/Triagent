interface FloatingFleckProps {
  className: string;
}

export function FloatingFleck({ className }: FloatingFleckProps) {
  return (
    <span
      className={`absolute h-1 w-1 rounded-full bg-[#A9822E]/30 ${className}`}
    />
  );
}