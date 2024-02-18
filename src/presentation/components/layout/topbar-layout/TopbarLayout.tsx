"use client";

import { useSidebar } from "@/infrastructure/context/SidebarContext";
import { Topbar } from "@/presentation/components";

const TopbarLayout = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />;
};

export default TopbarLayout;
