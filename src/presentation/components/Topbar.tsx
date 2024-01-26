import Link from "next/link";
import LogoIcon from "@/assets/svg/LogoIcon";
import Image from "next/image";
import Logout from "@/assets/svg/logout.svg";

const Topbar = () => {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between px-6 py-3 bg-[#121417]">
      <Link href="/" className="flex items-center gap-4">
        <LogoIcon />
        <p className="text-2xl leading-{140%} font-bold">FitHub</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <Image src={Logout} alt="logout" width={24} height={24} />
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
