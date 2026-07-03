"use client";

import { useSession } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./styles/landing.css";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import HowItWorks from "@/components/landing/HowItWorks";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import DemoStrip from "@/components/landing/DemoStrip";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import LandingAnimations from "@/components/landing/LandingAnimations";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
  if (session) {
    router.push("/dashboard");
  }
}, [session]);
  return (
    <div className="bg-[#F4F6F7] text-[#1A2B35] font-sans">
      <LandingAnimations/>
      <Navbar />
      <Hero />
      <Marquee />
      <HowItWorks />
      <Stats />
      <Features />
      <DemoStrip />
      <CTA />
      <Footer />
    </div>
  );
}
