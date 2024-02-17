/* eslint-disable react-hooks/exhaustive-deps */
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { MeasurementsProgress } from "@/domain/entities/MeasurementsProgress";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import { useCallback, useEffect, useState } from "react";

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
  });
  const [measurementsProgress, setMeasurementsProgress] =
    useState<MeasurementsProgress>({
      measurementsProgressID: 0,
      idAthlete: 0,
      gluteus: 0,
      biceps: 0,
      chest: 0,
      waist: 0,
      hips: 0,
      thigh: 0,
      calf: 0,
      shoulders: 0,
      forearm: 0,
      height: 0,
      weight: 0,
      date: "",
    });

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(measurementsProgress);
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

  const toggleModal = (modalName: "createModal") => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  useEffect(() => {
    console.log("userSelected", userSelected);
  }, [userSelected]);

  const handleOpenModal = async (modalName: "createModal") => {
    toggleModal(modalName);
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

  const handleSetHips = (hips: number) => {
    setMeasurementsProgress({ ...measurementsProgress, hips });
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

  const handleSetDate = (date: string) => {
    const registerDate = new Date(date).toISOString();

    setMeasurementsProgress({ ...measurementsProgress, date: registerDate });
  };

  return {
    search,
    suggestions,
    showSuggestions,
    userSelected,
    isModalOpen,
    handleChange,
    handleSelectSuggestion,
    toggleModal,
    handleOpenModal,
    handleSetGlueteus,
    handleSetBiceps,
    handleSetChest,
    handleSetWaist,
    handleSetHips,
    handleSetThigh,
    handleSetCalf,
    handleSetShoulders,
    handleSetForearm,
    handleSetHeight,
    handleSetWeight,
    handleSetDate,
    handleSubmit,
  };
};

export default ViewModel;
