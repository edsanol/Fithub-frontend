"use client";

import { Bottombar, LeftSidebar, Topbar } from "@/presentation/components";
import type { Metadata } from "next";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "FitHub Connect - Dashboard Administrativo",
//   description: "Dashboard Administrativo para FitHub Connect",
// };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <LeftSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
