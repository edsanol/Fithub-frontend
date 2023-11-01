import Link from "next/link";
import { Button } from "@nextui-org/button";
import { ButtonLogin } from ".";

const Navbar = () => {
  return (
    <>
      <header className="">
        <nav className="flex items-center justify-between w-full h-[84px]">
          <div>
            <h2 className="text-4xl font-extrabold text-[#6B7280]">FitHub</h2>
          </div>
          <div className="flex">
            <ul className="flex items-center">
              <Link href="/">
                <li className="text-lg font-bold text-white cursor-pointer mx-3">
                  Home
                </li>
              </Link>
              <Link href="/">
                <li className="text-lg font-bold text-white cursor-pointer mx-3">
                  Beneficios
                </li>
              </Link>
              <Link href="/">
                <li className="text-lg font-bold text-white cursor-pointer mx-3">
                  Contacto
                </li>
              </Link>
            </ul>
            <div className="flex items-center w-[14.5rem] justify-between ml-8 mr-11">
              <ButtonLogin />
              <Button size="md" radius="sm" color="primary">
                <Link href="/register">
                  <p className="text-white font-semibold">Regístrate</p>
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
