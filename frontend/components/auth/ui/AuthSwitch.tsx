import Link from "next/link";

interface AuthSwitchProps {
  label: string;
  href: string;
  linkText: string;
}

export default function AuthSwitch({
  label,
  href,
  linkText,
}: AuthSwitchProps) {
  return (
    <p className="mt-7 text-center text-sm text-[#5B6472]">
      {label}{" "}
      <Link
        href={href}
        className="font-semibold text-[#7F621F] transition-colors hover:text-[#A9822E]"
      >
        {linkText}
      </Link>
    </p>
  );
}