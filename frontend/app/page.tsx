"use client";

import { useSession } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./styles/landing.css";
// import Navbar from "@/components/landing/Navbar";
// import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import HowItWorks from "@/components/landing/HowItWorks";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import DemoStrip from "@/components/landing/DemoStrip";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import LandingAnimations from "@/components/landing/LandingAnimations";
import { Hero } from "@/components/landing/hero/Hero";
import { Navbar } from "@/components/landing/hero/Navbar";
import { StorySection } from "@/components/landing/story/StorySection";
import { CapabilitiesSection } from "@/components/landing/capabilities/CapabilitiesSection";
// import Hero from "../components/landing/mistralLanding";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8F6F2]">
        <Hero />
        <StorySection />
        <CapabilitiesSection />
      </main>
    </>
    // <div className="bg-[#F4F6F7] text-[#1A2B35] font-sans">
    //   <LandingAnimations/>
    //   <Navbar />
    //   <Hero />
    //   <Marquee />
    //   <HowItWorks />
    //   <Stats />
    //   <Features />
    //   <DemoStrip />
    //   <CTA />
    //   <Footer />
    // </div>
  );
}
