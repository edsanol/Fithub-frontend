/* eslint-disable react-hooks/exhaustive-deps */
import { TYPES } from "@/config/types";
import { useEffect, useState } from "react";
import container from "@/config/inversifyContainer";
import { GetDashboardDataUseCase } from "@/domain/useCases/Dashboard/getDashboardData";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import { BarGraphicValues } from "@/domain/models/BarGraphicValues";
import { GetDailyAssistanceGraphicUseCase } from "@/domain/useCases/Dashboard/getDailyAssistanceGraphic";
import { PieGraphicValues } from "@/domain/models/PieGraphicValues";
import { GetMembershipGraphicUseCase } from "@/domain/useCases/Dashboard/getMembershipGraphic";
import { GetIncomeGraphicUseCase } from "@/domain/useCases/Dashboard/getIncomeGraphic";

const ViewModel = () => {
  const [dashboardData, setDashboardData] = useState<DashboardDataValues>();
  const [getDailyAssistanceGraphic, setGetDailyAssistanceGraphic] = useState<BarGraphicValues[]>([]);
  const [getMembershipGraphic, setGetMembershipGraphic] = useState<PieGraphicValues[]>([]);
  const [getIncomeGraphic, setGetIncomeGraphic] = useState<BarGraphicValues[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getDashboardDataUseCase = container.get<GetDashboardDataUseCase>(TYPES.GetDashboardDataUseCase);
        const getDailyAssistanceGraphicUseCase = container.get<GetDailyAssistanceGraphicUseCase>(TYPES.GetDailyAssistanceGraphicUseCase);
        const getMembershipGraphicUseCase = container.get<GetMembershipGraphicUseCase>(TYPES.GetMembershipGraphicUseCase);
        const getIncomeGraphicUseCase = container.get<GetIncomeGraphicUseCase>(TYPES.GetIncomeGraphicUseCase);

        const responses = await Promise.all([
          getDashboardDataUseCase.execute(),
          getDailyAssistanceGraphicUseCase.execute("2024-01-01", "2024-02-08"),
          getMembershipGraphicUseCase.execute(),
          getIncomeGraphicUseCase.execute("2024-01-01", "2024-02-08")
        ]);

        setDashboardData(responses[0]);
        setGetDailyAssistanceGraphic(responses[1]);
        setGetMembershipGraphic(responses[2]);
        setGetIncomeGraphic(responses[3]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isLoading,
    dashboardData,
    getDailyAssistanceGraphic,
    getMembershipGraphic,
    getIncomeGraphic,
  };
};

export default ViewModel;
