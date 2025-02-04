"use client";

import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import { PieChart } from "@mui/x-charts/PieChart";
import { Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface CustomDashboardDataProps {
  dashboardData: DashboardDataValues | undefined;
  loading: boolean;
}

const CustomDashboardDoubleGraph = ({
  dashboardData,
  loading,
}: CustomDashboardDataProps) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (dashboardData) {
      setData([
        {
          id: "0",
          value: dashboardData.activeAthletes,
          color: "#5855F6",
          label: "Usuarios Activos",
        },
        {
          id: "1",
          value: dashboardData.inactiveAthletes,
          color: "#981A2A",
          label: "Usuarios Inactivos",
        },
      ]);
    }
  }, [dashboardData]);

  return (
    <Skeleton
      isLoaded={!loading}
      className="w-[90%] h-36 mx-auto sm:w-[45%] lg:w-[31%] rounded-[2rem]"
      classNames={{ base: "dark" }}
    >
      <div className="bg-[#18181B] h-36 flex justify-around rounded-[2rem]">
        <div className="w-[60%] flex flex-col justify-evenly pl-4">
          <div className="flex h-9 w-[90%] items-center">
            <p className="text-sm font-bold text-[#8F8E96] w-[82%]">
              Usuarios Activos
            </p>
            <p className="text-2xl font-bold text-white">
              {dashboardData?.activeAthletes}
            </p>
          </div>
          <div className="flex h-9 w-[90%] items-center">
            <p className="text-sm font-bold text-[#8F8E96] w-[82%]">
              Usuarios Inactivos
            </p>
            <p className="text-2xl font-bold text-white">
              {dashboardData?.inactiveAthletes}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {dashboardData?.activeAthletes !== 0 &&
          dashboardData?.inactiveAthletes !== 0 ? (
            <PieChart
              series={[
                {
                  data: data,
                  innerRadius: 21,
                  outerRadius: 34,
                  paddingAngle: 5,
                  cornerRadius: 5,
                },
              ]}
              width={100}
              height={90}
              slotProps={{
                legend: { hidden: true },
              }}
              margin={{ right: 0, bottom: 0 }}
              tooltip={{
                trigger: "none",
              }}
            />
          ) : null}
        </div>
      </div>
    </Skeleton>
  );
};

export default CustomDashboardDoubleGraph;
