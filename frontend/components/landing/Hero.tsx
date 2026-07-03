"use client"
import Link from "next/link";
import HeroDemo from "./HeroDemo";

export default function Hero() {
    return (
        <section className="hero">
            <canvas className="mesh" id="meshCanvas" />

            <div className="hero-copy">
                <div className="badge">
                    <span className="badge-dot"></span>
                    AI-powered inbox + calendar assistant
                </div>

                <h1 className="h1">
                    Your inbox doesn't
                    <br />
                    manage itself.
                    <br />
                    <span className="h1-accent">Now it can.</span>
                </h1>

                <p className="hero-sub">
                    Connect Gmail and Google Calendar. Ask Triagent to triage your inbox,
                    draft replies, schedule meetings — in plain language.
                </p>

                <div className="cta-row">
                    <Link href={"/signup"} className="btn-primary">Try it free</Link>
                    <button className="btn-ghost">See it work ↓</button>
                </div>
            </div>

            <div className="hero-visual">
                <HeroDemo />
            </div>

            <div className="hero-fade"></div>
        </section>
    );
}