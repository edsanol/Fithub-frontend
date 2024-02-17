/* eslint-disable react-hooks/exhaustive-deps */
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { MeasurementsProgress } from "@/domain/entities/MeasurementsProgress";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { CreateMeasurementProgressUseCase } from "@/domain/useCases/AthleteUser/createMeasurementProgressUseCase";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import { GetMeasurementProgressListUseCase } from "@/domain/useCases/AthleteUser/getMeasurementProgressListUseCase";
import { useCallback, useEffect, useState } from "react";
import { MeasurementProgressColumns } from "@/assets/constants";
import { GetMeasurementProgressByLastMonthUseCase } from "@/domain/useCases/AthleteUser/getMeasurementProgressByLastMonthUseCase";
import { MeasurementProgressByLastMonth } from "@/domain/models/MeasurementProgressByLastMonth";

const useDebounce = (value: string, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const ViewModel = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<AthleteUser[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearch = useDebounce(search);
  const [userSelected, setUserSelected] = useState<AthleteUser>({
    athleteId: 0,
    athleteName: "",
    athleteLastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    genre: "",
    idGym: 0,
    gymName: "",
    registerDate: "",
    status: true,
    membershipName: "",
    cardAccessCode: "",
  });
  const [forceHideSuggestions, setForceHideSuggestions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({
    createModal: false,
    progressModal: false,
  });
  const [measurementsProgress, setMeasurementsProgress] =
    useState<MeasurementsProgress>({
      measurementsProgressID: 0,
      idAthlete: 0,
      gluteus: 0,
      biceps: 0,
      chest: 0,
      waist: 0,
      thigh: 0,
      calf: 0,
      shoulders: 0,
      forearm: 0,
      height: 0,
      weight: 0,
    });
  const [measurementProgressList, setMeasurementProgressList] =
    useState<PaginateResponseList>({
      totalRecords: 0,
      items: [],
    });
  const [measurementProgressByLastMonth, setMeasurementProgressByLastMonth] =
    useState<MeasurementProgressByLastMonth[]>([]);

  useEffect(() => {
    if (userSelected && userSelected.athleteId !== 0) {
      setMeasurementsProgress({
        ...measurementsProgress,
        idAthlete: userSelected.athleteId!,
      });

      getAthleteMeasurementProgressList({ numPage: 1 });
      getMeasurementProgressByLastMonth();
    }
  }, [userSelected]);

  useEffect(() => {
    if (forceHideSuggestions) {
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      if (debouncedSearch.trim() === "") {
        setSuggestions([]);
        setShowSuggestions(false);
      } else {
        await getAthleteUserByFilter({ textFilter: debouncedSearch });
        setShowSuggestions(true);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch, forceHideSuggestions]);

  const handleChange = useCallback((value: string) => {
    setSearch(value);
    setForceHideSuggestions(false);
  }, []);

  const handleSelectSuggestion = useCallback((userSelected: AthleteUser) => {
    setSearch(userSelected.athleteName + " " + userSelected.athleteLastName);
    setUserSelected(userSelected);
    setShowSuggestions(false);
    setForceHideSuggestions(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (measurementsProgress.idAthlete === 0) {
      return;
    }

    const createMeasurementProgress =
      container.get<CreateMeasurementProgressUseCase>(
        TYPES.CreateMeasurementProgressUseCase
      );

    const response = createMeasurementProgress.execute(measurementsProgress);

    if (!response) {
      console.log("error");
      return;
    }

    await getAthleteMeasurementProgressList({
      numPage: 1,
    });
    setIsModalOpen({ createModal: false, progressModal: false });
  };

  const getAthleteUserByFilter = async (
    params: Partial<{ textFilter: string }>
  ) => {
    try {
      const getAthleteUserListUseCase =
        container.get<GetAthleteUserListUseCase>(
          TYPES.GetAthleteUserListUseCase
        );
      const response = await getAthleteUserListUseCase.execute({
        numFilter: 1,
        numRecordsPage: 100,
        ...params,
      });

      if (!response) {
        console.log("error");
        return;
      }

      setSuggestions(response.items);
    } catch (error) {
      console.log(error);
    }
  };

  const getAthleteMeasurementProgressList = async (
    params: Partial<PaginateData>
  ) => {
    try {
      const id = userSelected.athleteId!;

      const getMeasurementProgressListUseCase =
        container.get<GetMeasurementProgressListUseCase>(
          TYPES.GetMeasurementProgressListUseCase
        );

      const response = await getMeasurementProgressListUseCase.execute(id, {
        numRecordsPage: 7,
        ...params,
      });

      if (!response) {
        console.log("error");
        return;
      }

      setMeasurementProgressList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getMeasurementProgressByLastMonth = async () => {
    try {
      const getMeasurementProgress =
        container.get<GetMeasurementProgressByLastMonthUseCase>(
          TYPES.GetMeasurementProgressByLastMonthUseCase
        );

      const response = await getMeasurementProgress.execute(
        userSelected.athleteId!
      );

      if (!response) {
        console.log("error");
        return;
      }

      setMeasurementProgressByLastMonth(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetNumPage = async (numPage: number) => {
    await getAthleteMeasurementProgressList({ numPage });
  };

  const toggleModal = (modalName: "createModal" | "progressModal") => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleOpenModal = async (
    modalName: "createModal" | "progressModal",
    muscle?: string
  ) => {
    toggleModal(modalName);

    if (modalName === "progressModal") {
      console.log(muscle);
    }
  };

  const handleSetGlueteus = (gluteus: number) => {
    setMeasurementsProgress({ ...measurementsProgress, gluteus });
  };

  const handleSetBiceps = (biceps: number) => {
    setMeasurementsProgress({ ...measurementsProgress, biceps });
  };

  const handleSetChest = (chest: number) => {
    setMeasurementsProgress({ ...measurementsProgress, chest });
  };

  const handleSetWaist = (waist: number) => {
    setMeasurementsProgress({ ...measurementsProgress, waist });
  };

  const handleSetThigh = (thigh: number) => {
    setMeasurementsProgress({ ...measurementsProgress, thigh });
  };

  const handleSetCalf = (calf: number) => {
    setMeasurementsProgress({ ...measurementsProgress, calf });
  };

  const handleSetShoulders = (shoulders: number) => {
    setMeasurementsProgress({ ...measurementsProgress, shoulders });
  };

  const handleSetForearm = (forearm: number) => {
    setMeasurementsProgress({ ...measurementsProgress, forearm });
  };

  const handleSetHeight = (height: number) => {
    setMeasurementsProgress({ ...measurementsProgress, height });
  };

  const handleSetWeight = (weight: number) => {
    setMeasurementsProgress({ ...measurementsProgress, weight });
  };

  return {
    search,
    suggestions,
    showSuggestions,
    userSelected,
    isModalOpen,
    measurementProgressList,
    MeasurementProgressColumns,
    measurementProgressByLastMonth,
    handleChange,
    handleSelectSuggestion,
    toggleModal,
    handleOpenModal,
    handleSetGlueteus,
    handleSetBiceps,
    handleSetChest,
    handleSetWaist,
    handleSetThigh,
    handleSetCalf,
    handleSetShoulders,
    handleSetForearm,
    handleSetHeight,
    handleSetWeight,
    handleSubmit,
    handleSetNumPage,
  };
};

export default ViewModel;
