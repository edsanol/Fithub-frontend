import { usePathname } from "next/navigation";

const ViewModel = () => {
  const pathname = usePathname();

  const gymId = pathname.match(/\/self-registration\/(.*)/);
  const gymIdValue = gymId ? gymId[1] : null;

  return {
    gymIdValue,
  };
};

export default ViewModel;
