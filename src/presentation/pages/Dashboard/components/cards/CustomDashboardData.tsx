import Image from "next/image";
import User from "@/assets/svg/user.svg";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import { Skeleton } from "@nextui-org/react";

interface CustomDashboardDataProps {
  data: DashboardDataValues | undefined;
  loading: boolean;
}

const CustomDashboardData = ({ data, loading }: CustomDashboardDataProps) => {
  return (
    <Skeleton
      data-testid="custom-dashboard-data"
      isLoaded={!loading}
      className="w-[90%] h-36 mx-auto rounded-[2rem] sm:w-[40%] lg:w-[30%]"
      classNames={{ base: "dark" }}
    >
      <div className="bg-[#8946CE] h-36 flex flex-col justify-evenly rounded-[2rem]">
        <div className="flex h-9 w-[92%] items-center pl-2">
          <Image src={User} alt={"Home"} width={20} height={20} />
          <p className="text-sm font-bold text-white w-[96%] pl-1">
            Total Usuarios
          </p>
          <p className="text-2xl font-bold text-white">{data?.totalAthletes}</p>
        </div>
        <div className="flex h-9 w-[92%] items-center pl-2">
          <Image src={User} alt={"Home"} width={20} height={20} />
          <p className="text-sm font-bold text-white w-[96%] pl-1">
            Nuevos Usuarios del mes
          </p>
          <p className="text-2xl font-bold text-white">
            {data?.newAthletesByMonth}
          </p>
        </div>
      </div>
    </Skeleton>
  );
};

export default CustomDashboardData;
