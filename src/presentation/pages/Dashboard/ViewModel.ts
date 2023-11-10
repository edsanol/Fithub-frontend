import { AthleteUserList } from "@/domain/models/AthleteUserList";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import { useState } from "react";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteColumns } from "@/assets/constants";

const ViewModel = () => {
  const [athleteListData, setAthleteListData] = useState<AthleteUserList>({
    numPage: 1,
    numRecordsPage: 10,
    textFilter: "",
    numFilter: 0,
    stateFilter: true,
    download: true,
  });

  const [athlete, setAthletes] = useState<any[]>([]);

  const handleSubmit = async () => {
    console.log("entro al submit");
    try {
      console.log(athleteListData);

      const getAthleteUserListUseCase =
        container.get<GetAthleteUserListUseCase>(
          TYPES.GetAthleteUserListUseCase
        );

      const response = await getAthleteUserListUseCase.execute(athleteListData);

      if (!response) {
        console.log("error");
        return;
      }

      console.log(response);

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
    console.log("consulta por texto");
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
