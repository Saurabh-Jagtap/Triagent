import FooterLink from "./FooterLink";

const links = [
  "Privacy",
  "GitHub",
  "X",
  "Contact",
];

export default function FooterLinks() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[13px]">
      {links.map((link, index) => (
        <div
          key={link}
          className="flex items-center gap-3"
        >
          <FooterLink>{link}</FooterLink>

          {index < links.length - 1 && (
            <span className="text-[#E7E2D6]">·</span>
          )}
        </div>
      ))}
    </div>
  );
}