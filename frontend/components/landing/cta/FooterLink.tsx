interface FooterLinkProps {
  children: React.ReactNode;
}

export default function FooterLink({
  children,
}: FooterLinkProps) {
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