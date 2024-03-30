"use client";

import ViewModel from "./ViewModel";
import CustomDashboardGraph from "./components/cards/CustomDashboardGraph";
import CustomDashboardData from "./components/cards/CustomDashboardData";
import CustomDashboardDoubleGraph from "./components/cards/CustomDashboardDoubleGraph";
import {
  CustomAreaGraph,
  CustomPieGraph,
  CustomScaleGraph,
} from "@/presentation/components";
import { Skeleton } from "@nextui-org/react";
import { useEffect } from "react";

const Dashboard = () => {
  const {
    isLoading,
    dashboardData,
    getDailyAssistanceGraphic,
    getMembershipGraphic,
    getIncomeGraphic,
  } = ViewModel();

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between">
        <CustomDashboardData data={dashboardData} loading={isLoading} />
        <CustomDashboardDoubleGraph
          dashboardData={dashboardData}
          loading={isLoading}
        />
        <CustomDashboardGraph
          dashboardData={dashboardData}
          loading={isLoading}
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-5 lg:justify-between">
        <Skeleton
          isLoaded={!isLoading}
          className="w-[95%] h-[24rem] lg:w-[49%] rounded-[2rem]"
          classNames={{ base: "dark" }}
        >
          <div className="h-[24rem] p-5 bg-[#18181B]">
            <div className="w-[90%] h-[94%]">
              <p className="text-xl font-bold text-white">Asistencia Diaria</p>
              {getDailyAssistanceGraphic.length > 0 ? (
                <CustomAreaGraph initialData={getDailyAssistanceGraphic} />
              ) : (
                <p className="text-lg font-bold text-white">
                  No se encontraron registros
                </p>
              )}
            </div>
          </div>
        </Skeleton>
        <Skeleton
          isLoaded={!isLoading}
          className="w-[95%] h-[24rem] lg:w-[49%] rounded-[2rem]"
          classNames={{ base: "dark" }}
        >
          <div className="h-[24rem] p-5 bg-[#18181B]">
            <p className="text-xl font-bold text-white">
              Distribución de membresias
            </p>
            {getMembershipGraphic.length > 0 ? (
              <CustomPieGraph initialData={getMembershipGraphic} />
            ) : (
              <p className="text-lg font-bold text-white">
                No se encontraron registros
              </p>
            )}
          </div>
        </Skeleton>
      </div>
      <div className="flex flex-wrap gap-2 justify-center lg:justify-between">
        <Skeleton
          className="w-[92%] h-[26rem] sm:w-[94%] lg:w-[100%] rounded-[2rem] mt-5"
          isLoaded={!isLoading}
          classNames={{ base: "dark" }}
        >
          <div className="bg-[#18181B] h-[26rem] flex justify-center items-center">
            <div className="w-[90%] h-[94%]">
              <p className="text-xl font-bold text-white">Ingresos Mensuales</p>
              {getIncomeGraphic.length > 0 ? (
                <CustomScaleGraph initialData={getIncomeGraphic} />
              ) : (
                <p className="text-lg font-bold text-white">
                  No se encontraron registros
                </p>
              )}
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default Dashboard;
