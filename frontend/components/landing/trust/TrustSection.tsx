import { Container } from "../shared/Container";
import PendingActionCard from "./PendingActionCard";
import PrincipleGrid from "./PrincipleGrid";
import TrustHeader from "./TrustHeader";

export default function TrustSection() {
    return (
        <section id="trust" className="py-32 lg:py-48">
            <Container>
                <TrustHeader />

                <div className="mt-20 flex justify-center lg:mt-24">
                    <PendingActionCard />
                </div>

                <p className="mt-8 text-center font-newsreader text-lg italic text-[#5B6472]">
                    Every action waits for your approval.
                </p>

                <div className="mt-24 lg:mt-40">
                    <PrincipleGrid />
                </div>
            </Container>
        </section>
    );
}