"use client";

import { useState } from "react";
import { Dumbbell } from "lucide-react";
import { menuItems } from "@/assets/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HamburgerIcon from "@/assets/svg/hamburger-icon.svg";
import CloseIcon from "@/assets/svg/close.svg";
import Link from "next/link";
import RedirectButton from "./RedirectButton";

const Navbar = () => {
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);

  return (
    <>
      <nav className="w-full bg-black fixed top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link className="flex items-center justify-center" href="#">
              <Dumbbell className="h-6 w-6 text-[#006fed]" />
              <span className="ml-2 text-xl font-bold">FitHub</span>
            </Link>

            <div className="md:hidden">
              <button
                className="p-2 rounded-md outline-none"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <Image src={CloseIcon} width={22} height={22} alt="logo" />
                ) : (
                  <Image
                    src={HamburgerIcon}
                    width={24}
                    height={24}
                    alt="logo"
                    className="focus:border-none active:border-none"
                  />
                )}
              </button>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-12 md:p-0 block" : "hidden"
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex">
                <>
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="text-md font-bold py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:#006fed md:hover:text-[#006fed] md:hover:bg-transparent"
                    >
                      <Link href={item.href} onClick={() => setNavbar(!navbar)}>
                        {item.label}
                      </Link>
                    </li>
                  ))}

                  <li className="hidden md:block">
                    <RedirectButton
                      color="secondary"
                      variant="bordered"
                      onClick={() => router.push("/login")}
                      label="Iniciar sesión"
                      customClass="text-[#9c34c2]"
                    />
                  </li>

                  <li className="hidden md:block ml-2">
                    <RedirectButton
                      color="primary"
                      variant="solid"
                      onClick={() => router.push("/register")}
                      label="Registrarse"
                      customClass="text-[#fff]"
                    />
                  </li>

                  {navbar && (
                    <>
                      <li className="md:hidden text-md font-bold py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:#006fed md:hover:text-[#006fed] md:hover:bg-transparent">
                        <Link href="/login" onClick={() => setNavbar(!navbar)}>
                          Iniciar sesión
                        </Link>
                      </li>

                      <li className="md:hidden text-md font-bold py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:#006fed md:hover:text-[#006fed] md:hover:bg-transparent">
                        <Link
                          href="/register"
                          onClick={() => setNavbar(!navbar)}
                        >
                          Registrarse
                        </Link>
                      </li>
                    </>
                  )}
                </>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
