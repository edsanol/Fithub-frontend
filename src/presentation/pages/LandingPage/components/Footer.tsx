import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800 bg-black">
      <p className="text-xs text-gray-400">
        © 2024 FitHub. Todos los derechos reservados.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:text-[#006fed]" href="#">
          Terminos y condiciones
        </Link>
        <Link className="text-xs hover:text-[#006fed]" href="#">
          Privacidad
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
