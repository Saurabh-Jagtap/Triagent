import { Container } from "../shared/Container";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { MorningBrief } from "./MorningBrief";

export function Hero() {
    return (
        <section className="overflow-hidden min-h-screen flex flex-col bg-[#F8F6F2]">
            <Container>
                <div className="grid flex-1 min-h-[calc(100vh-80px)] items-center gap-20 py-12 lg:grid-cols-[1.08fr_0.95fr] lg:gap-20 lg:py-8">
                    <HeroContent />

                    <div className="relative flex justify-center lg:justify-end">
                        <HeroBackground />
                        <MorningBrief />
                    </div>
                </div>
            </Container>
        </section>
    );
}