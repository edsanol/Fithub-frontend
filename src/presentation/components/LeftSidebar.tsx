"use client";

import { sidebarLinks } from "@/assets/constants";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import Logout from "@/assets/svg/logout.svg";
import { useEffect, useRef, useState } from "react";
import ArrowLeftIcon from "@/assets/svg/ArrowLeftIcon";
import UserIcon from "@/assets/svg/UserIcon";
import SidebarLinkGroup from "./SidebarLinkGroup";

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
        <div className="flex items-center justify-end px-6 py-5.5 lg:py-6.5 mb-6">
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <ArrowLeftIcon />
          </button>
        </div>

        <div className="flex items justify-center">
          <Link href="/dashboard">
            <p className="text-2xl text-[#3669FC] font-black">FitHub</p>
          </Link>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-bodydark2">
                Menu principal
              </h3>

              <ul className="mb-6 flex flex-col gap-4">
                <li>
                  <Link
                    href="/dashboard"
                    className={`group relative flex items-center gap-2.5 rounded-lg p-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("dashboard") && "bg-[#3669FC]"
                    }`}
                  >
                    <DashboardIcon />
                    Dashboard
                  </Link>
                </li>

                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/users" || pathname.includes("user")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-lg p-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === "/users" ||
                              pathname.includes("user")) &&
                            "bg-[#3669FC]"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <UserIcon />
                          Deportistas
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && "rotate-180"
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </Link>

                        <div
                          className={`translate transform overflow-hidden ${
                            !open && "hidden"
                          }`}
                        >
                          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/create-user"
                                className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/forms/form-elements" &&
                                  "text-white"
                                }`}
                              >
                                Crear deportista
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/forms/form-layout"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/forms/form-layout" &&
                                  "text-white"
                                }`}
                              >
                                Listado deportistas
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  }}
                </SidebarLinkGroup>

                <li>
                  <Link
                    href="/membership"
                    className={`group relative flex items-center gap-2.5 rounded-lg p-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("membership") && "bg-[#3669FC]"
                    }`}
                  >
                    <UserIcon />
                    Membresías
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-bodydark2">
                Otros
              </h3>

              <ul className="mb-6 flex flex-col gap-1.5">
                <li>
                  <Link
                    href="/gym-profile"
                    className={`group relative flex items-center gap-2.5 rounded-lg p-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("gym-profile") && "bg-[#3669FC]"
                    }`}
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_130_9756)">
                        <path
                          d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_130_9756">
                          <rect
                            width="18"
                            height="18"
                            fill="white"
                            transform="translate(0 0.052124)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Perfil
                  </Link>
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
