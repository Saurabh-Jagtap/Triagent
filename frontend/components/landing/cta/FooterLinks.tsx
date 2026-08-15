import FooterLink from "./FooterLink";

const links = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms of Service",
    href: "/terms",
  },
  {
    label: "GitHub",
  },
  {
    label: "X",
  },
  {
    label: "Contact",
  },
];

export default function FooterLinks() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[13px]">
      {links.map((link, index) => (
        <div
          key={link.label}
          className="flex items-center gap-3"
        >
          <FooterLink href={link.href}>
            {link.label}
          </FooterLink>

          {index < links.length - 1 && (
            <span className="text-[#E7E2D6]">·</span>
          )}
        </div>
      ))}
    </div>
  );
}