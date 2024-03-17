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

const Dashboard = () => {
  const {
    dashboardData,
    getDailyAssistanceGraphic,
    getMembershipGraphic,
    getIncomeGraphic,
  } = ViewModel();

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between">
        <CustomDashboardData data={dashboardData} />
        <CustomDashboardDoubleGraph dashboardData={dashboardData} />
        <CustomDashboardGraph dashboardData={dashboardData} />
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-5 lg:justify-between">
        <div className="w-[95%] h-[24rem] p-5 bg-[#18181B] rounded-[2rem] lg:w-[49%]">
          <div className="w-[90%] h-[94%]">
            <p className="text-xl font-bold text-white">Asistencia Diaria</p>
            <CustomAreaGraph initialData={getDailyAssistanceGraphic} />
          </div>
        </div>
        <div className="w-[95%] h-[24rem] p-5 bg-[#18181B] rounded-[2rem] lg:w-[49%]">
          <p className="text-xl font-bold text-white">
            Distribución de membresias
          </p>
          <CustomPieGraph initialData={getMembershipGraphic} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center lg:justify-between">
        <div className="bg-[#18181B] w-[92%] h-[26rem] flex justify-center items-center mt-5 sm:w-[94%] lg:w-[100%] rounded-[2rem]">
          <div className="w-[90%] h-[94%]">
            <p className="text-xl font-bold text-white">Ingresos Mensuales</p>
            <CustomScaleGraph initialData={getIncomeGraphic} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
