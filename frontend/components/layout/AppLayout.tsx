"use client";

import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";

type AppLayoutProps = {
  children: ReactNode;
};

const SIDEBAR_STORAGE_KEY = "triagent-sidebar-collapsed";

export const AppLayout = ({
  children,
}: AppLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem(
      SIDEBAR_STORAGE_KEY
    );

    if (storedValue === "true") {
      setSidebarCollapsed(true);
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      SIDEBAR_STORAGE_KEY,
      String(sidebarCollapsed)
    );
  }, [sidebarCollapsed, isHydrated]);

  return (
    <div className="min-h-screen bg-[#F7F5EF]">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() =>
          setSidebarCollapsed((previous) => !previous)
        }
      />

      <main
        className={[
          "min-h-screen p-6",
          "transition-[margin] duration-200 ease-in-out",
          sidebarCollapsed ? "ml-[64px]" : "ml-[212px]",
        ].join(" ")}
      >
        {children}
      </main>
    </div>
  );
};