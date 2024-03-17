"use client";

import { signOut } from "next-auth/react";
import Cookies from "js-cookie";
import Image from "next/image";
import Logout from "@/assets/svg/logout.svg";
import MenuIcon from "@/assets/svg/MenuIcon";
import { useRouter } from "next/navigation";

const Topbar = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    router.push("/login");
    signOut();
  };

  return (
    <header className="sticky top-0 z-10 flex w-full bg-[#121417] drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <button
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            props.setSidebarOpen(!props.sidebarOpen);
          }}
          className="z-99999 block p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
        >
          <MenuIcon />
        </button>

        <div className="flex items-center gap-1">
          <div className="block md:hidden" onClick={logout}>
            <Image src={Logout} alt="logout" width={24} height={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
