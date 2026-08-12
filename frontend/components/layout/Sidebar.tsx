"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Inbox,
  CalendarDays,
  Sparkles,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { signOut, useSession } from "@/utils/auth-client";
import Brand from "../shared/Brand";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Inbox",
    href: "/inbox",
    icon: Inbox,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    name: "Assistant",
    href: "/assistant",
    icon: Sparkles,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export const Sidebar = ({
  collapsed,
  onToggle,
}: SidebarProps) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  const initials =
    session?.user?.name
      ?.slice(0, 2)
      ?.toUpperCase() ?? "SA";

  return (
    <aside
      className={[
        "fixed left-0 top-0 h-screen",
        "shrink-0 flex flex-col",
        "bg-[#1C2333] text-[#EFE9D8]",
        "px-5 py-7",
        "transition-[width] duration-200 ease-in-out",
        collapsed ? "w-[64px]" : "w-[212px]",
      ].join(" ")}
    >
      <div className="relative flex items-center mb-9">
        {/* Brand */}
        <div className="flex items-center justify-between mb-9 w-full">
          <Brand
            href="/dashboard"
            variant="reversed"
            size="sm"
            iconOnly={collapsed}
          />

          <button
            type="button"
            onClick={onToggle}
            aria-label={
              collapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            title={
              collapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#7F899C] hover:bg-[rgba(239,233,216,0.06)] hover:text-[#F6F1E4] transition-colors duration-150 shrink-0"
          >
            {collapsed ? (
              <PanelLeftOpen size={17} strokeWidth={1.5} />
            ) : (
              <PanelLeftClose size={17} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.name : undefined}
              className={[
                "flex items-center",
                collapsed ? "justify-center" : "gap-2.5",
                "px-2.5 py-[9px]",
                "border-l-2",
                "rounded-r-[6px]",
                "text-[13.5px]",
                "transition-all duration-150",
                isActive
                  ? "border-[#A9812F] bg-[rgba(169,129,47,0.10)] text-[#F6F1E4]"
                  : "border-transparent text-[#9BA3B8] hover:bg-[rgba(169,129,47,0.06)] hover:text-[#C7CCDA]",
              ].join(" ")}
            >
              <Icon
                size={16}
                strokeWidth={1.6}
                className="shrink-0"
              />

              <span
                className={[
                  "whitespace-nowrap overflow-hidden",
                  "transition-all duration-200",
                  collapsed
                    ? "max-w-0 opacity-0"
                    : "max-w-[120px] opacity-100",
                ].join(" ")}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="mt-auto pt-4 border-t border-[rgba(239,233,216,0.12)]">
        <div
          className={[
            "flex items-center",
            collapsed ? "justify-center" : "gap-2.5",
          ].join(" ")}
        >
          <div className="w-[26px] h-[26px] rounded-full bg-[#2B3450] text-[#F6F1E4] flex items-center justify-center shrink-0">
            <span className="font-serif text-[11px]">
              {initials}
            </span>
          </div>

          <div
            className={[
              "min-w-0 overflow-hidden transition-all duration-200",
              collapsed
                ? "max-w-0 opacity-0"
                : "max-w-[140px] opacity-100",
            ].join(" ")}
          >
            <div className="text-[12.5px] text-[#C7CCDA] truncate">
              {session?.user?.name ?? "User"}
            </div>

            <div className="text-[11px] text-[#8B93A3] truncate">
              {session?.user?.email ?? ""}
            </div>
          </div>
        </div>

        <div
          className={[
            "overflow-hidden transition-all duration-200",
            collapsed
              ? "max-h-0 opacity-0"
              : "max-h-10 opacity-100",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-3 px-0.5 text-[11px] text-[#8B93A3] hover:text-[#F6F1E4] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

    </aside>
  );
};