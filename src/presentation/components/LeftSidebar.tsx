"use client";

import React from "react";
import { sidebarLinks } from "@/assets/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Logout from "@/assets/svg/logout.svg";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    signOut();

    router.push("/login");
  };

  return (
    <section className="custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto bg-[#121417] pb-5 pt-28 max-md:hidden">
      <div className="flex w-full flex-1 flex-col gap-6 px-6 ">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                isActive && "bg-[#3669FC]"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className="text-[#fff] max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <div className="flex cursor-pointer gap-4 p-4" onClick={logout}>
          <Image src={Logout} alt="logout" width={24} height={24} />
          <p className="text-[#fff] max-lg:hidden">Logout</p>
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
