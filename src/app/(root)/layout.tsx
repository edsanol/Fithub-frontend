import { SidebarProvider } from "@/infrastructure/context/SidebarContext";
import { SidebarLayout, TopbarLayout } from "@/presentation/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FitHub Connect - Dashboard Administrativo",
  description: "Dashboard Administrativo para FitHub Connect",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden">
          <SidebarLayout />

          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <TopbarLayout />

            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
