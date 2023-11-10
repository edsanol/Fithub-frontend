import { AthleteUserList } from "@/domain/models/AthleteUserList";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import React, { useState } from "react";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";

const ViewModel = () => {
  const [athleteListData, setAthleteListData] = useState<AthleteUserList>({
    numPage: 0,
    numRecordsPage: 0,
    order: "",
    sort: "",
    records: 0,
    numFilter: 0,
    textFilter: "",
    stateFilter: true,
    startDate: "",
    endDate: "",
    download: true,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetNumPage = (event: number) => {
    setAthleteListData({ ...athleteListData, numPage: event });
  };

  const handleSetNumRecordsPage = (event: number) => {
    setAthleteListData({ ...athleteListData, numRecordsPage: event });
  };

  const handleSetRecords = (event: number) => {
    setAthleteListData({ ...athleteListData, records: event });
  };

  const handleSetTextFilter = (event: string) => {
    setAthleteListData({ ...athleteListData, textFilter: event });
  };

  return {
    handleSubmit,
    handleSetNumPage,
    handleSetNumRecordsPage,
    handleSetRecords,
    handleSetTextFilter,
  };
};

export default ViewModel;
