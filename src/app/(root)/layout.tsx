import { Bottombar, LeftSidebar, Topbar } from "@/presentation/components";
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
      <Topbar />

      <main className="flex flex-row">
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-28 max-md:pb-32 sm:px-10 overflow-auto bg-black">
          <div className="w-full max-w-4xl md:max-w-7xl">{children}</div>
        </section>
      </main>

      <Bottombar />
    </>
  );
}
