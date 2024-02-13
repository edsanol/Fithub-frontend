"use client";

import { useMobileCheck } from "@/hooks/useMobileCheck";
import { LineChart } from "@mui/x-charts/LineChart";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface CustomAssistanceGraphProps {
  initialData: any[];
}

const CustomAssistanceGraph = ({ initialData }: CustomAssistanceGraphProps) => {
  const isMobile = useMobileCheck();
  const data = initialData;

  const formattedData = data.map((data) => ({
    ...data,
    time: format(parseISO(data.time), "dd MMMM, yyyy", { locale: es }),
  }));

  const valueFormatter = (value: number) => `${value}`;

  const width = isMobile ? 900 : 500;
  const height = isMobile ? 800 : 300;

  return (
    <div className="w-[95%] h-[24rem] p-5 bg-[#18181B] rounded-[2rem] lg:w-[48%]">
      <p className="text-xl font-bold text-white">Asistencia Diaria</p>

      <div className="w-[100%] h-[90%] flex justify-center items-center">
        <LineChart
          dataset={formattedData}
          xAxis={[{ scaleType: "band", dataKey: "time" }]}
          series={[
            {
              valueFormatter,
            },
          ]}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default CustomAssistanceGraph;
