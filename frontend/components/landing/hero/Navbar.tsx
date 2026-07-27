import { Menu } from "lucide-react";

const navigation = [
    {
        label: "Product",
        href: "#product",
    },
    {
        label: "How it Works",
        href: "#how-it-works",
    },
    {
        label: "Docs",
        href: "#docs",
    },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b bg-[#F8F6F2]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
                {/* Logo */}
                <a
                    href="/"
                    className="flex items-center gap-3"
                    aria-label="Triagent"
                >
                    <div className="nav-logo">
                        <svg width="28" height="38" viewBox="0 0 44 54" fill="none">
                            <rect x="8" y="16" width="28" height="24" rx="8" fill="#13294B" />
                            <circle cx="17" cy="27" r="3.5" fill="white" />
                            <circle cx="27" cy="27" r="3.5" fill="white" />
                            <path d="M17 34 Q22 37.5 27 34" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                            <rect x="20" y="5" width="4" height="11" fill="#2D4A5E" rx="2" />
                            <circle cx="22" cy="4" r="3.5" fill="#4A7FA0" />
                            <rect x="1" y="20" width="8" height="4" rx="2" fill="#2D4A5E" />
                            <rect x="35" y="20" width="8" height="4" rx="2" fill="#2D4A5E" />
                        </svg>
                        <span className="text-xl text-[#13294B]" >Triagent</span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-10 lg:flex">
                    {navigation.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="relative text-[15px] font-medium text-[#495468] transition-colors duration-200 hover:text-[#13294B]"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-6 lg:flex">
                    <button className="text-[15px] font-medium text-[#495468] transition-colors hover:text-[#13294B]">
                        Login
                    </button>

                    <button className="rounded-2xl bg-[#13294B] px-6 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#19345F]">
                        Get Started →
                    </button>
                </div>

                {/* Mobile */}
                <button
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DDD6C1] text-[#13294B] lg:hidden"
                    aria-label="Open Menu"
                >
                    <Menu className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}