import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";

interface PieCenterLabelProps {
  dashboardData: DashboardDataValues | undefined;
}

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <text
      x={left + width / 2}
      y={top + height / 2}
      textAnchor="middle"
      dominantBaseline="central"
      fill="#FFFFFF"
      fontSize="16"
    >
      {children}
    </text>
  );
}

const CustomDashboardGraph = ({ dashboardData }: PieCenterLabelProps) => {
  const [data, setData] = useState<any>([]);
  const [centerLabel, setCenterLabel] = useState<string>("");

  useEffect(() => {
    if (dashboardData) {
      setData([
        {
          id: 0,
          value: dashboardData.dailyAssistance,
          color: "#8946CE",
        },
        {
          id: 1,
          value: dashboardData.activeAthletes - dashboardData.dailyAssistance,
          color: "#18181B",
        },
      ]);

      const percentage =
        (dashboardData.dailyAssistance / dashboardData.activeAthletes) * 100;
      setCenterLabel(`${percentage.toFixed(0)}%`);
    }
  }, [dashboardData]);

  return (
    <div className="bg-[#5855F6] w-[90%] h-36 mx-auto flex justify-around rounded-xl sm:w-[45%] lg:w-[31%]">
      <div className="w-[54%] flex flex-col justify-center pl-4">
        <p className="text-sm font-bold text-white mb-4">Asistencia Diaria</p>
        <p className="text-2xl font-bold text-white">
          {dashboardData?.dailyAssistance}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <PieChart
          series={[
            {
              data: data,
              innerRadius: 24,
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
        >
          <PieCenterLabel>{centerLabel}</PieCenterLabel>
        </PieChart>
      </div>
    </div>
  );
};

export default CustomDashboardGraph;
