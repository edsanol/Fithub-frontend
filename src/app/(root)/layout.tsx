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
        <div className="flex min-h-screen overflow-hidden">
          <SidebarLayout />

          <div className="flex flex-1 flex-col h-full overflow-y-auto overflow-x-hidden bg-black">
            <TopbarLayout />

            <main className="flex-grow">
              <div className="mx-auto max-w-screen-2xl p-4 pt-10 pb-16 mt-16 mb-8 md:p-6 md:mt-10 md:mb-5 md:pb-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
