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
import { useDateGMT5 } from "@/hooks/useDateGMT5";
import { GetAthleteAssistanceUseCase } from "@/domain/useCases/Dashboard/getAthleteAssistanceUseCase";
import { PaginateData } from "@/domain/models/PaginateData";
import { AthleteAssistance } from "@/domain/models/AthleteAssistance";
import { AthleteBirthDate } from "@/domain/models/AthleteBirthDate";
import { GetAthleteBirthDateUseCase } from "@/domain/useCases/Dashboard/getAthleteBirthDateUseCase";

const ViewModel = () => {
  const dateGMT5 = useDateGMT5();
  const [dashboardData, setDashboardData] = useState<DashboardDataValues>();
  const [getDailyAssistanceGraphic, setGetDailyAssistanceGraphic] = useState<
    BarGraphicValues[]
  >([]);
  const [getMembershipGraphic, setGetMembershipGraphic] = useState<
    PieGraphicValues[]
  >([]);
  const [getIncomeGraphic, setGetIncomeGraphic] = useState<BarGraphicValues[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<string>(dateGMT5);
  const [athleteAssistance, setAthleteAssistance] = useState<
    AthleteAssistance[]
  >([]);
  const [athleteBirthDate, setAthleteBirthDate] = useState<AthleteBirthDate[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    getAthleteAssistance({ startDate: selectedDate, numPage: page });
  }, [page, selectedDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getDashboardDataUseCase = container.get<GetDashboardDataUseCase>(
          TYPES.GetDashboardDataUseCase
        );
        const getDailyAssistanceGraphicUseCase =
          container.get<GetDailyAssistanceGraphicUseCase>(
            TYPES.GetDailyAssistanceGraphicUseCase
          );
        const getMembershipGraphicUseCase =
          container.get<GetMembershipGraphicUseCase>(
            TYPES.GetMembershipGraphicUseCase
          );
        const getIncomeGraphicUseCase = container.get<GetIncomeGraphicUseCase>(
          TYPES.GetIncomeGraphicUseCase
        );
        const getAthleteBirthDateUseCase =
          container.get<GetAthleteBirthDateUseCase>(
            TYPES.GetAthleteBirthDateUseCase
          );

        const responses = await Promise.all([
          getDashboardDataUseCase.execute(),
          getDailyAssistanceGraphicUseCase.execute("2024-01-01", "2024-12-31"),
          getMembershipGraphicUseCase.execute(),
          getIncomeGraphicUseCase.execute("2024-01-01", "2024-12-31"),
          getAthleteBirthDateUseCase.execute(),
        ]);

        setDashboardData(responses[0]);
        setGetDailyAssistanceGraphic(responses[1]);
        setGetMembershipGraphic(responses[2]);
        setGetIncomeGraphic(responses[3]);
        setAthleteBirthDate(responses[4]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    getAthleteAssistance({ startDate: date });
  };

  const getAthleteAssistance = async (params: Partial<PaginateData>) => {
    try {
      const getAthleteAssistanceUseCase =
        container.get<GetAthleteAssistanceUseCase>(
          TYPES.GetAthleteAssistanceUseCase
        );

      const response = await getAthleteAssistanceUseCase.execute({
        numRecordsPage: 7,
        order: "desc",
        sort: "TimeAssistence",
        ...params,
      });

      if (!response) {
        console.log("error");
        return;
      }

      setAthleteAssistance(response.items);
      setTotalPages(Math.ceil(response.totalRecords / 7));
    } catch (error) {}
  };

  const handleRefresh = () => {
    getAthleteAssistance({ startDate: dateGMT5 });
    setSelectedDate(dateGMT5);
  };

  const handleFilterByName = (athleteName: string) => {
    getAthleteAssistance({
      startDate: selectedDate,
      numFilter: 1,
      textFilter: athleteName,
    });
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return {
    isLoading,
    dashboardData,
    getDailyAssistanceGraphic,
    getMembershipGraphic,
    getIncomeGraphic,
    athleteAssistance,
    selectedDate,
    page,
    totalPages,
    athleteBirthDate,
    handleDateChange,
    handleRefresh,
    handleFilterByName,
    handlePreviousPage,
    handleNextPage,
  };
};

export default ViewModel;
