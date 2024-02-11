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
      <main className="flex flex-row">
        <LeftSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Topbar />

          <section className="flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-28 max-md:pb-32 sm:px-10 overflow-auto bg-black">
            <div className="w-full max-w-4xl md:max-w-7xl">{children}</div>
          </section>
        </div>
      </main>

      <Bottombar />
    </>
  );
}
