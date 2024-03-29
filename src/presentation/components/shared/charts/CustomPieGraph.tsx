"use client";

import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { PieGraphicValues } from "@/domain/models/PieGraphicValues";
import { useEffect, useState } from "react";
import { useMobileCheck } from "@/hooks/useMobileCheck";

interface CustomPieGraphProps {
  initialData: PieGraphicValues[];
}

const CustomPieGraph = ({ initialData }: CustomPieGraphProps) => {
  const isMobile = useMobileCheck();
  const [pieData, setPieData] = useState<any[]>([]);

  useEffect(() => {
    if (initialData) {
      const data = initialData.map((item, index) => {
        return {
          id: index,
          value: item.value,
          color: colorsList[index].color,
          label: item.label,
        };
      });
      setPieData(data);
    }
  }, [initialData]);

  const colorsList = [
    {
      id: 0,
      color: "#5855F6",
    },
    {
      id: 1,
      color: "#27272A",
    },
    {
      id: 2,
      color: "#8946CE",
    },
    {
      id: 3,
      color: "#00BFA5",
    },
    {
      id: 4,
      color: "#C38890",
    },
  ];

  return (
    <>
      <div className="w-[100%] h-[90%] flex justify-center items-center">
        {!isMobile ? (
          <PieChart
            series={[
              {
                arcLabel: (item) => `${Math.round(item.value)}%`,
                data: pieData,
              },
            ]}
            width={700}
            height={300}
          />
        ) : (
          <PieChart
            series={[
              {
                arcLabel: (item) => `${Math.round(item.value)}%`,
                data: pieData,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
                fontSize: 12,
              },
            }}
            height={300}
            slotProps={{
              legend: {
                direction: "column",
                position: {
                  vertical: "bottom",
                  horizontal: "middle",
                },
                padding: 0,
                labelStyle: {
                  fontSize: 12,
                  fill: "white",
                },
              },
            }}
            margin={{ right: 0, bottom: 160 }}
            tooltip={{
              trigger: "none",
            }}
          />
        )}
      </div>
    </>
  );
};

export default CustomPieGraph;
