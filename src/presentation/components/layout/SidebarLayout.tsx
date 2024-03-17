"use client";

import { useSidebar } from "@/infrastructure/context/SidebarContext";
import { LeftSidebar } from "@/presentation/components";

const SidebarLayout = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <LeftSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  );
};

export default SidebarLayout;
