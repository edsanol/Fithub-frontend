"use client";

import { createChart, ColorType } from "lightweight-charts";
import { MutableRefObject, useEffect, useRef } from "react";

const colors = {
  backgroundColor: "#18181B",
  lineColor: "#8946CE",
  textColor: "white",
  areaTopColor: "white",
  areaBottomColor: "rgba(41, 98, 255, 0.28)",
};

interface CustomIncomeGraphProps {
  initialData: any[];
}

const CustomIncomeGraph = ({ initialData }: CustomIncomeGraphProps) => {
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
          visible: false,
        },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: "rgba(171, 71, 188, 1)",
      topColor: "rgba(171, 71, 188, 0.56)",
      bottomColor: "rgba(171, 71, 188, 0.04)",
      lineWidth: 2,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, colors]);

  return (
    <div className="bg-[#18181B] w-[92%] h-[26rem] flex justify-center items-center my-2 sm:w-[94%] lg:w-[100%] rounded-[2rem]">
      <div className="w-[90%] h-[94%]">
        <p className="text-xl font-bold text-white">Ingresos Mensuales</p>
        <div ref={chartContainerRef} />
      </div>
    </div>
  );
};

export default CustomIncomeGraph;
