"use client";

import { BarGraphicValues } from "@/domain/models/BarGraphicValues";
import { createChart, ColorType } from "lightweight-charts";
import { MutableRefObject, useEffect, useRef } from "react";

// const initialData = [
//   { time: "2018-12-22", value: 28.51 },
//   { time: "2018-12-23", value: 25.11 },
//   { time: "2018-12-24", value: 27.02 },
//   { time: "2018-12-25", value: 27.32 },
//   { time: "2018-12-26", value: 25.17 },
//   { time: "2018-12-27", value: 28.89 },
//   { time: "2018-12-28", value: 25.46 },
//   { time: "2018-12-29", value: 23.92 },
//   { time: "2018-12-30", value: 22.68 },
//   { time: "2018-12-31", value: 24.67 },
// ];

const colors = {
  backgroundColor: "#000000",
  lineColor: "#8946CE",
  textColor: "white",
  areaTopColor: "white",
  areaBottomColor: "rgba(41, 98, 255, 0.28)",
};

interface CustomAssistanceGraphProps {
  initialData: any[];
}

const CustomAssistanceGraph = ({ initialData }: CustomAssistanceGraphProps) => {
  const data = initialData;

  const chartContainerRef: MutableRefObject<any> = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: "#363C4E",
          visible: false,
        },
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, colors]);

  return (
    <div className="w-[92%] h-[24rem] flex justify-center items-center my-2 sm:w-[92%] lg:w-[48%] border-1 rounded-[2rem]">
      <div className="w-[90%] h-[94%]">
        <p className="text-xl font-bold text-white">Asistencia Diaria</p>
        <div ref={chartContainerRef} />
      </div>
    </div>
  );
};

export default CustomAssistanceGraph;
