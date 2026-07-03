"use client"
import Link from "next/link";

export default function CTA() {
  return (
    <div className="cta-section">
      <div className="cta-robot">
        <svg
          width="44"
          height="54"
          viewBox="0 0 44 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="16" width="28" height="24" rx="8" fill="#2D4A5E" />

          <circle cx="17" cy="27" r="3.5" fill="white" />
          <circle cx="27" cy="27" r="3.5" fill="white" />

          <path
            d="M17 34 Q22 37.5 27 34"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          <rect
            x="20"
            y="5"
            width="4"
            height="11"
            rx="2"
            fill="#1A2B35"
          />

          <circle cx="22" cy="4" r="3.5" fill="#2D4A5E" />

          <rect
            x="1"
            y="20"
            width="8"
            height="4"
            rx="2"
            fill="#1A2B35"
          />

          <rect
            x="35"
            y="20"
            width="8"
            height="4"
            rx="2"
            fill="#1A2B35"
          />

          <rect
            x="12"
            y="40"
            width="6"
            height="8"
            rx="2"
            fill="#1A2B35"
          />

          <rect
            x="26"
            y="40"
            width="6"
            height="8"
            rx="2"
            fill="#1A2B35"
          />
        </svg>
      </div>

      <h2 className="cta-h2">
        Stop managing your inbox.
        <br />
        Let Triagent handle it.
      </h2>

      <p className="cta-sub">
        Free to start. Works with your existing Gmail and Google Calendar. No
        credit card needed.
      </p>

      <div className="cta-btns">
        <Link href={"/signup"} className="btn-cta-p">
          Try it free
        </Link>

        <Link href={"/signin"} className="btn-cta-g">
          Sign in with email
        </Link>
      </div>
    </div>
  );
}