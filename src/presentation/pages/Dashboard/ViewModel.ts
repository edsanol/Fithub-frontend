/* eslint-disable react-hooks/exhaustive-deps */
import { TYPES } from "@/config/types";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import container from "@/config/inversifyContainer";
import { GetDashboardDataUseCase } from "@/domain/useCases/Dashboard/getDashboardData";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import { BarGraphicValues } from "@/domain/models/BarGraphicValues";
import { GetDailyAssistanceGraphicUseCase } from "@/domain/useCases/Dashboard/getDailyAssistanceGraphic";
import { PieGraphicValues } from "@/domain/models/PieGraphicValues";
import { GetMembershipGraphicUseCase } from "@/domain/useCases/Dashboard/getMembershipGraphic";
import { GetIncomeGraphicUseCase } from "@/domain/useCases/Dashboard/getIncomeGraphic";

const ViewModel = () => {
  const { data: session } = useSession();

  const [idGym, setIdGym] = useState<number>(0);
  const [dashboardData, setDashboardData] = useState<DashboardDataValues>();
  const [getDailyAssistanceGraphic, setGetDailyAssistanceGraphic] = useState<BarGraphicValues[]>([]);
  const [getMembershipGraphic, setGetMembershipGraphic] = useState<PieGraphicValues[]>([]);
  const [getIncomeGraphic, setGetIncomeGraphic] = useState<BarGraphicValues[]>([]);

  useEffect(() => {
    if (session && session.user.gymId !== idGym) {
      setIdGym(session.user.gymId);
    }
  }, [session]);

  useEffect(() => {
    if (idGym !== 0) {
      getDashboardData();
      getDailyAssistance();
      getMembershipGraph();
      getIncomeGraph();
    }
  }, [idGym]);

  const getDashboardData = async () => {
    const getDashboardDataUseCase = container.get<GetDashboardDataUseCase>(
      TYPES.GetDashboardDataUseCase
    );
    const response = await getDashboardDataUseCase.execute();

    if (!response) {
      console.log("error");
      return;
    }

    setDashboardData(response);
  };

  const getDailyAssistance = async () => {
    const getDailyAssistanceGraphicUseCase =
      container.get<GetDailyAssistanceGraphicUseCase>(
        TYPES.GetDailyAssistanceGraphicUseCase
      );

    const response = await getDailyAssistanceGraphicUseCase.execute(
      "2024-01-01",
      "2024-02-08"
    );

    if (!response) {
      console.log("error");
      return;
    }

    setGetDailyAssistanceGraphic(response);
  };

  const getMembershipGraph = async () => {
    const getMembershipGraphicUseCase =
      container.get<GetMembershipGraphicUseCase>(
        TYPES.GetMembershipGraphicUseCase
      );

    const response = await getMembershipGraphicUseCase.execute();

    if (!response) {
      console.log("error");
      return;
    }

    setGetMembershipGraphic(response);
  };

  const getIncomeGraph = async () => {
    const getIncomeGraphicUseCase = container.get<GetIncomeGraphicUseCase>(
      TYPES.GetIncomeGraphicUseCase
    );

    const response = await getIncomeGraphicUseCase.execute(
      "2024-01-01",
      "2024-02-08"
    );

    if (!response) {
      console.log("error");
      return;
    }

    console.log(response);
    setGetIncomeGraphic(response);
  };

  return {
    dashboardData,
    getDailyAssistanceGraphic,
    getMembershipGraphic,
    getIncomeGraphic,
  };
};

export default ViewModel;
