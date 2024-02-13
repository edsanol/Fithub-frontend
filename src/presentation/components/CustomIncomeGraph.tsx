import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface CustomIncomeGraphProps {
  initialData: any[];
}

const CustomIncomeGraph = ({ initialData }: CustomIncomeGraphProps) => {
  const data = initialData;

  const dataset = data;

  const formattedData = dataset.map((data) => ({
    ...data,
    time: format(parseISO(data.time), "dd MMMM, yyyy", { locale: es }),
  }));

  const chartSetting = {
    width: 900,
    height: 340,
  };

  const valueFormatter = (value: number) => `${value}`;

  return (
    <>
      <div className="bg-[#18181B] w-[92%] h-[26rem] flex justify-center items-center my-2 sm:w-[94%] lg:w-[100%] rounded-[2rem]">
        <div className="w-[90%] h-[94%]">
          <p className="text-xl font-bold text-white">Ingresos Mensuales</p>
          <div className="flex justify-center items-center mt-5">
            {formattedData.length > 0 && (
              <BarChart
                dataset={formattedData}
                xAxis={[{ scaleType: "band", dataKey: "time" }]}
                series={[
                  {
                    dataKey: "value",
                    label: "Ingresos Mensuales",
                    valueFormatter,
                    color: "#8946CE",
                  },
                ]}
                {...chartSetting}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomIncomeGraph;
