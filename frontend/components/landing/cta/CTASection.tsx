import { Container } from "../shared/Container";
import CTAButton from "./CTAButton";
import CTAHeader from "./CTAHeader";
import Footer from "./Footer";
import Link from "next/link";

export default function CTASection() {
    return (
        <section id="cta" className="relative overflow-hidden py-36 lg:py-56">
            {/* Gold Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(169,130,46,0.10),transparent_65%)] blur-md md:h-[750px] md:w-[750px] lg:h-[900px] lg:w-[900px]" />

            <Container>
                <div className="relative z-10 flex flex-col items-center">
                    <CTAHeader />

                    <div className="mt-14">
                        <Link href="/signup">
                            <CTAButton>
                                Get Early Access
                            </CTAButton>
                        </Link>
                    </div>

                    <Footer />
                </div>
            </Container>
        </section>
    );
}