"use client";

import { createChart, ColorType } from "lightweight-charts";
import { MutableRefObject, useEffect, useRef } from "react";

const colors = {
  backgroundColor: "transparent",
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
    <div className="w-[95%] h-[24rem] p-5 bg-[#18181B] rounded-[2rem] lg:w-[49%]">
      <div className="w-[90%] h-[94%]">
        <p className="text-xl font-bold text-white">Asistencia Diaria</p>
        <div ref={chartContainerRef} />
      </div>
    </div>
  );
};

export default CustomAssistanceGraph;
