"use client";

import ViewModel from "./ViewModel";
import CustomDashboardGraph from "@/presentation/components/CustomDashboardGraph";
import CustomDashboardData from "@/presentation/components/CustomDashboardData";
import CustomDashboardDoubleGraph from "@/presentation/components/CustomDashboardDoubleGraph";
import CustomAssistanceGraph from "@/presentation/components/CustomAssistanceGraph";
import CustomMembershipDistributionGraph from "@/presentation/components/CustomMembershipDistributionGraph";
import CustomIncomeGraph from "@/presentation/components/CustomIncomeGraph";

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
