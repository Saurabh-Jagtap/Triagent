import Brand from "@/components/shared/Brand";
import { Menu } from "lucide-react";

const navigation = [
    {
        label: "Story",
        href: "#story",
    },
    {
        label: "Capabilities",
        href: "#capabilities",
    },
    {
        label: "Trust",
        href: "#trust",
    },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b bg-[#F8F6F2]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
                {/* Logo */}
                <Brand />

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