"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import Logout from "@/assets/svg/logout.svg";
import { useEffect, useRef, useState } from "react";
import UserIcon from "@/assets/svg/UserIcon";
import SidebarLinkGroup from "./SidebarLinkGroup";
import DashboardIcon from "@/assets/svg/DashboardIcon";
import MembershipIcon from "@/assets/svg/MembershipIcon";
import { SidebarItems, SidebarLinkGroupItems } from "./SidebarItems";
import ProfileIcon from "@/assets/svg/ProfileIcon";
import ArrowDownIcon from "@/assets/svg/ArrowDownIcon";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const LeftSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    signOut();
  };

  return (
    <>
      <aside
        ref={sidebar}
        className={`absolute left-0 top-0 z-50 p-3 flex h-screen w-72 flex-col overflow-y-hidden bg-[#121417] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items justify-center mt-5">
          <Link href="/dashboard">
            <p className="text-2xl text-[#3669FC] font-black">FitHub</p>
          </Link>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 py-4 px-4 lg:px-6">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-bodydark2">
                Menu principal
              </h3>

              <ul className="mb-6 flex flex-col gap-4">
                <li>
                  <SidebarItems
                    url="/dashboard"
                    route="dashboard"
                    icon={<DashboardIcon />}
                    label="Dashboard"
                  />
                </li>

                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/users" || pathname.includes("user")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <>
                        <SidebarItems
                          url="#"
                          icon={<UserIcon />}
                          route="user"
                          label="Deportistas"
                          handleClick={() => {
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                          secondaryIcon={<ArrowDownIcon open={open} />}
                        />

                        <div
                          className={`transition-opacity opacity-0 duration-700 ease-in-out overflow-hidden ${
                            open ? "opacity-100 max-h-96" : "max-h-0"
                          }`}
                        >
                          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                            <li>
                              <SidebarLinkGroupItems
                                label="Crear deportista"
                                url="/create-user"
                                route="/create-user"
                              />
                            </li>
                            <li>
                              <SidebarLinkGroupItems
                                label="Listado deportistas"
                                url="/user-list"
                                route="/user-list"
                              />
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  }}
                </SidebarLinkGroup>

                <li>
                  <SidebarItems
                    url="/membership"
                    route="membership"
                    icon={<MembershipIcon />}
                    label="Membresías"
                  />
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-bodydark2">
                Otros
              </h3>

              <ul className="mb-6 flex flex-col gap-1.5">
                <li>
                  <SidebarItems
                    url="/gym-profile"
                    route="gym-profile"
                    icon={<ProfileIcon />}
                    label="Perfil"
                  />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;
