import Link from "next/link";

interface FooterLinkProps {
  children: React.ReactNode;
  href?: string;
}

export default function FooterLink({
  children,
  href,
}: FooterLinkProps) {
  if (href) {
    return (
      <Link
        href={href}
        className="
          text-[13px]
          text-[#5B6472]
          transition-colors
          hover:text-[#13294B]
        "
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className="
        text-[13px]
        text-[#5B6472]
        transition-colors
        hover:text-[#13294B]
      "
    >
      {children}
    </button>
  );
}