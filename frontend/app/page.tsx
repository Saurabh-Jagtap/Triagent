"use client"

import "./styles/landing.css";

import { Hero } from "@/components/landing/hero/Hero";
import { Navbar } from "@/components/landing/hero/Navbar";
import { StorySection } from "@/components/landing/story/StorySection";
import { CapabilitiesSection } from "@/components/landing/capabilities/CapabilitiesSection";
import TrustSection from "@/components/landing/trust/TrustSection";
import CTASection from "@/components/landing/cta/CTASection";
import { ProductPurposeSection } from "@/components/landing/hero/ProductPurposeSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8F6F2]">
        <Hero />
        <ProductPurposeSection/>
        <StorySection />
        <CapabilitiesSection />
        <TrustSection />
        <CTASection />
      </main>
    </>
  );
}
