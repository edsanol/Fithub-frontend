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
import { useCallback, useEffect, useReducer, useState } from "react";
import { MeasurementProgressColumns } from "@/assets/constants";
import { GetMeasurementProgressByLastMonthUseCase } from "@/domain/useCases/AthleteUser/getMeasurementProgressByLastMonthUseCase";
import { MeasurementProgressByLastMonth } from "@/domain/models/MeasurementProgressByLastMonth";
import { GetMeasurementsGraphicUseCase } from "@/domain/useCases/AthleteUser/getMeasurementsGraphicUseCase";
import { BarGraphicValues } from "@/domain/models/BarGraphicValues";
import { useDebounce } from "@/hooks/useDebounce";
import { IMeasurementProgressValidation } from "@/presentation/interfaces";
import { isValidMeasurement } from "@/presentation/helpers";

interface State {
  userSelected: AthleteUser;
  measurementsProgress: MeasurementsProgress;
  measurementsProgressError: IMeasurementProgressValidation;
  measurementProgressList: PaginateResponseList;
  measurementProgressByLastMonth: MeasurementProgressByLastMonth[];
  suggestions: AthleteUser[];
  graphicValues: BarGraphicValues[];
  isModalOpen: {
    createModal: boolean;
    progressModal: boolean;
  };
}

type Action = 
  | { type: "SET_FIELD"; field: keyof MeasurementsProgress; value: number }
  | { type: 'SET_MEASUREMENTS_PROGRESS_ERROR'; measurementsProgressError: IMeasurementProgressValidation }
  | { type: "SET_MEASUREMENTS_PROGRESS_LIST"; measurementProgressList: PaginateResponseList }
  | { type: 'SET_USER_SELECTED', userSelected: AthleteUser }
  | { type: 'SET_MEASUREMENTS_BY_LAST_MONTH'; measurementProgressByLastMonth: MeasurementProgressByLastMonth[] }
  | { type: 'SET_SUGGESTIONS'; suggestions: AthleteUser[] }
  | { type: 'SET_GRAPHIC_VALUES'; graphicValues: BarGraphicValues[] }
  | { type: "TOGGLE_MODAL"; modalName: string; value?: boolean }
  | { type: "CLOSE_MODAL"; };

const initialState: State = {
  userSelected: {
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
  },
  measurementsProgress: {
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
  },
  measurementsProgressError: {
    gluteusError: false,
    bicepsError: false,
    chestError: false,
    waistError: false,
    thighError: false,
    calfError: false,
    shouldersError: false,
    forearmError: false,
    heightError: false,
    weightError: false,
  },
  measurementProgressList: {
    totalRecords: 0,
    items: [],
  },
  measurementProgressByLastMonth: [],
  suggestions: [],
  graphicValues: [],
  isModalOpen: {
    createModal: false,
    progressModal: false,
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, measurementsProgress: { ...state.measurementsProgress, [action.field]: action.value } };
    case 'SET_MEASUREMENTS_PROGRESS_ERROR':
      return { ...state, measurementsProgressError: action.measurementsProgressError };
    case 'SET_MEASUREMENTS_PROGRESS_LIST':
      return { ...state, measurementProgressList: action.measurementProgressList };
    case 'SET_USER_SELECTED':
      return { ...state, userSelected: action.userSelected };
    case 'SET_MEASUREMENTS_BY_LAST_MONTH':
      return { ...state, measurementProgressByLastMonth: action.measurementProgressByLastMonth };
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.suggestions };
    case 'SET_GRAPHIC_VALUES':
      return { ...state, graphicValues: action.graphicValues };
    case "TOGGLE_MODAL":
      return { ...state, isModalOpen: { ...state.isModalOpen, [action.modalName]: action.value ?? !state.isModalOpen[action.modalName as keyof State["isModalOpen"]] }};
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: { ...state.isModalOpen, createModal: false, progressModal: false }};
  }
}

const ViewModel = () => {
  const [{ measurementsProgress, measurementsProgressError, measurementProgressList, userSelected, measurementProgressByLastMonth, suggestions, graphicValues, isModalOpen }, dispatch] = useReducer(reducer, initialState);

  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearch = useDebounce(search);
  const [forceHideSuggestions, setForceHideSuggestions] = useState(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (userSelected && userSelected.athleteId !== 0) {
      dispatch({ type: "SET_FIELD", field: "idAthlete", value: userSelected.athleteId! });

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
        dispatch({ type: 'SET_SUGGESTIONS', suggestions: [] });
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
    dispatch({ type: 'SET_USER_SELECTED', userSelected });
    setShowSuggestions(false);
    setForceHideSuggestions(true);
  }, []);

  const handleIsValidForm = () => {
    const errors: IMeasurementProgressValidation = {
      gluteusError: !isValidMeasurement(measurementsProgress.gluteus),
      bicepsError: !isValidMeasurement(measurementsProgress.biceps),
      chestError: !isValidMeasurement(measurementsProgress.chest),
      waistError: !isValidMeasurement(measurementsProgress.waist),
      thighError: !isValidMeasurement(measurementsProgress.thigh),
      calfError: !isValidMeasurement(measurementsProgress.calf),
      shouldersError: !isValidMeasurement(measurementsProgress.shoulders),
      forearmError: !isValidMeasurement(measurementsProgress.forearm),
      heightError: !isValidMeasurement(measurementsProgress.height),
      weightError: !isValidMeasurement(measurementsProgress.weight),
    };

    dispatch({ type: "SET_MEASUREMENTS_PROGRESS_ERROR", measurementsProgressError: errors });
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const errors = handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      if (measurementsProgress.idAthlete === 0) {
        return;
      }
  
      const createMeasurementProgress = container.get<CreateMeasurementProgressUseCase>(TYPES.CreateMeasurementProgressUseCase);
  
      const response = createMeasurementProgress.execute(measurementsProgress);
  
      if (!response) {
        console.log("error");
        return;
      }
  
      await getAthleteMeasurementProgressList({ numPage: 1 });
      await getMeasurementProgressByLastMonth();
      dispatch({ type: "CLOSE_MODAL" });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
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

      dispatch({ type: 'SET_SUGGESTIONS', suggestions: response.items });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
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

      dispatch({ type: "SET_MEASUREMENTS_PROGRESS_LIST", measurementProgressList: response });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
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

      dispatch({ type: "SET_MEASUREMENTS_BY_LAST_MONTH", measurementProgressByLastMonth: response });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const getMeasurementsGraphic = async (muscle: string) => {
    try {
      const getMeasurementsGraphic =
        container.get<GetMeasurementsGraphicUseCase>(
          TYPES.GetMeasurementsGraphicUseCase
        );

      const response = await getMeasurementsGraphic.execute(
        userSelected.athleteId!,
        muscle,
        "2024-01-01",
        "2024-02-29"
      );

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_GRAPHIC_VALUES", graphicValues: response });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleSetNumPage = async (numPage: number) => {
    await getAthleteMeasurementProgressList({ numPage });
  };

  const toggleModal = (modalName: string, value?: boolean) => {
    dispatch({ type: "TOGGLE_MODAL", modalName, value });
  };

  const handleOpenModal = async (modalName: "createModal" | "progressModal", muscle?: string) => {
    toggleModal(modalName);

    if (modalName === "progressModal" && muscle) {
      await getMeasurementsGraphic(muscle);
    }
  };

  const setField = (field: keyof MeasurementsProgress, value: number) => {
    dispatch({ type: "SET_FIELD", field, value });
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
    graphicValues,
    errorModal,
    errorMessage,
    measurementsProgressError,
    setErrorModal,
    handleChange,
    handleSelectSuggestion,
    toggleModal,
    handleOpenModal,
    setField,
    handleSubmit,
    handleSetNumPage,
  };
};

export default ViewModel;
