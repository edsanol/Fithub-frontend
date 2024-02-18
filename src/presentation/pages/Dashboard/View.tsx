"use client";

import ViewModel from "./ViewModel";
import CustomDashboardGraph from "@/presentation/components/shared/charts/CustomDashboardGraph";
import CustomDashboardData from "@/presentation/components/shared/cards/CustomDashboardData";
import CustomDashboardDoubleGraph from "@/presentation/components/shared/charts/CustomDashboardDoubleGraph";
import CustomAssistanceGraph from "@/presentation/components/shared/charts/CustomAssistanceGraph";
import CustomMembershipDistributionGraph from "@/presentation/components/shared/charts/CustomMembershipDistributionGraph";
import CustomIncomeGraph from "@/presentation/components/shared/charts/CustomIncomeGraph";

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
        <CustomAssistanceGraph initialData={getDailyAssistanceGraphic} />
        <CustomMembershipDistributionGraph initialData={getMembershipGraphic} />
      </div>
      <div className="flex flex-wrap gap-2 justify-center lg:justify-between">
        <CustomIncomeGraph initialData={getIncomeGraphic} />
      </div>
    </div>
  );
};

export default Dashboard;
