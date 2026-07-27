import { Container } from "@/components/landing/shared/Container";
import { CapabilitiesHeader } from "./CapabilitiesHeader";
import { CapabilitiesCollage } from "./CapabilitiesCollage";

export function CapabilitiesSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <Container>
        <CapabilitiesHeader />

        <CapabilitiesCollage />
      </Container>
    </section>
  );
}