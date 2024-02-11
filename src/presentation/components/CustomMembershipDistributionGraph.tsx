import { PieGraphicValues } from "@/domain/models/PieGraphicValues";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

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

interface CustomMembershipDistributionGraphProps {
  initialData: PieGraphicValues[];
}

const CustomMembershipDistributionGraph = ({
  initialData,
}: CustomMembershipDistributionGraphProps) => {
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

  return (
    <div className="w-[92%] h-[24rem] flex justify-center items-center my-2 sm:w-[92%] lg:w-[48%] border-1 rounded-[2rem]">
      <div className="w-[90%] h-[94%]">
        <p className="text-xl font-bold text-white">
          Distribución de membresias
        </p>
        <div className="w-[100%] h-[80%] flex justify-center items-center">
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value}%`,
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
        </div>
      </div>
    </div>
  );
};

export default CustomMembershipDistributionGraph;
