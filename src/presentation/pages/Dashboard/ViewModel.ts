import { AthleteUserList } from "@/domain/models/AthleteUserList";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import { useState } from "react";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteColumns } from "@/assets/constants";
import { IAthleteUserList } from "@/presentation/interfaces/IAthlete";

const ViewModel = () => {
  const [athleteListData, setAthleteListData] = useState<AthleteUserList>({
    numRecordsPage: 7,
  });

  const [athlete, setAthletes] = useState<IAthleteUserList>({
    totalRecords: 0,
    items: [],
  });

  const handleSubmit = async () => {
    try {
      const getAthleteUserListUseCase =
        container.get<GetAthleteUserListUseCase>(
          TYPES.GetAthleteUserListUseCase
        );

      const response = await getAthleteUserListUseCase.execute(athleteListData);

      if (!response) {
        console.log("error");
        return;
      }

      setAthletes(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetNumPage = (event: number) => {
    setAthleteListData({ ...athleteListData, numPage: event });
    handleSubmit();
  };

  const handleSetNumRecordsPage = (event: number) => {
    setAthleteListData({ ...athleteListData, numRecordsPage: event });
    handleSubmit();
  };

  const handleSetTextFilter = (event: string) => {
    setAthleteListData({ ...athleteListData, textFilter: event, numFilter: 1 });
    handleSubmit();
  };

  return {
    handleSubmit,
    handleSetNumPage,
    handleSetNumRecordsPage,
    handleSetTextFilter,
    athlete,
    AthleteColumns,
  };
};

export default ViewModel;
