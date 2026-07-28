import Brand from "@/components/shared/Brand";
import FooterLinks from "./FooterLinks";

export default function Footer() {
  return (
    <footer className="mt-40 border-t border-[#E7E2D6] pt-16">
      <div className="mx-auto max-w-md text-center">
        <h3 className="font-newsreader text-2xl font-medium text-[#13294B]">
          <Brand textClassName="text-lg" />
        </h3>

        <p className="mt-3 font-newsreader text-base italic leading-7 text-[#5B6472]">
          Made to help you think,
          <br />
          not replace you.
        </p>

        <FooterLinks />

        <p className="mt-8 font-mono text-xs tracking-wide text-[#9BA1AC]">
          © 2026
        </p>
      </div>
    </footer>
  );
}