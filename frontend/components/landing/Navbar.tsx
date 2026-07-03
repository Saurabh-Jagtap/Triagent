"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  {
    label: "How it works",
    href: "#how-it-works",
  },
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Sign in",
    href: "/signin",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="nav-logo">
        <svg width="19" height="24" viewBox="0 0 44 54" fill="none">
          <rect x="8" y="16" width="28" height="24" rx="8" fill="#4A7FA0" />
          <circle cx="17" cy="27" r="3.5" fill="white" />
          <circle cx="27" cy="27" r="3.5" fill="white" />
          <path d="M17 34 Q22 37.5 27 34" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          <rect x="20" y="5" width="4" height="11" fill="#2D4A5E" rx="2" />
          <circle cx="22" cy="4" r="3.5" fill="#4A7FA0" />
          <rect x="1" y="20" width="8" height="4" rx="2" fill="#2D4A5E" />
          <rect x="35" y="20" width="8" height="4" rx="2" fill="#2D4A5E" />
        </svg>
        <span>Triagent</span>
      </div>

      <div className="nav-links">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ))}

        <Link href={"/signup"} className="nav-cta">
          Get started
        </Link>
      </div>

      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}

        <button className="nav-cta">
          Get started
        </button>
      </div>
    </nav>
  );
}