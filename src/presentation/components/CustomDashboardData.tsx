import Image from "next/image";
import User from "@/assets/svg/user.svg";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";

interface CustomDashboardDataProps {
  data: DashboardDataValues | undefined;
}

const CustomDashboardData = ({ data }: CustomDashboardDataProps) => {
  return (
    <div className="bg-[#8946CE] w-[90%] h-36 mx-auto flex flex-col justify-evenly rounded-xl sm:w-[45%] lg:w-[30%]">
      <div className="flex h-9 w-[92%] items-center pl-2">
        <Image src={User} alt={"Home"} width={20} height={20} />
        <p className="text-sm font-bold text-white w-[96%] pl-1">
          Total Usuarios
        </p>
        <p className="text-2xl font-bold text-white">{data?.totalAthletes}</p>
        <p className="pl-1 text-xs text-green-500">+10%</p>
      </div>
      <div className="flex h-9 w-[92%] items-center pl-2">
        <Image src={User} alt={"Home"} width={20} height={20} />
        <p className="text-sm font-bold text-white w-[96%] pl-1">
          Nuevos Usuarios del mes
        </p>
        <p className="text-2xl font-bold text-white">
          {data?.newAthletesByMonth}
        </p>
        <p className="pl-1 text-xs text-red-500">-10%</p>
      </div>
    </div>
  );
};

export default CustomDashboardData;
