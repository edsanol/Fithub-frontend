import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  label: string;
  url: string;
  icon: any;
  route: string;
  secondaryIcon?: any;
  handleClick?: () => void;
}

export const SidebarItems = ({
  url,
  icon,
  route,
  label,
  secondaryIcon,
  handleClick,
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      <Link
        onClick={handleClick && handleClick}
        href={url}
        className={`group relative flex items-center gap-2.5 rounded-lg p-4 font-medium text-sm duration-300 ease-in-out hover:bg-[#2A2E30] ${
          pathname.includes(route) && "bg-[#3669FC] hover:bg-[#3669FC]"
        }`}
      >
        {icon}
        {label}
        {secondaryIcon && secondaryIcon}
      </Link>
    </>
  );
};

interface SidebarLinkGroupProps {
  label: string;
  url: string;
  route: string;
}

export const SidebarLinkGroupItems = ({
  label,
  url,
  route,
}: SidebarLinkGroupProps) => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={url}
        className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-sm text-white duration-300 ease-in-out hover:text-[#2A2E30] ${
          pathname === route ? "text-[#2A2E30]" : "text-white"
        }`}
      >
        {label}
      </Link>
    </>
  );
};
