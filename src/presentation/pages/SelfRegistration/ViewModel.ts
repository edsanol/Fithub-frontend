import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { RegisterAthleteByQRUseCase } from "@/domain/useCases/AthleteUser/registerAthleteByQRUseCase";
import {
  isNotEmpty,
  isValidDocumentID,
  isValidEmail,
  isValidGenre,
  isValidName,
  isValidPhone,
} from "@/presentation/helpers";
import { ISelfRegistrationValidation } from "@/presentation/interfaces/Athlete/IAthlete";
import { usePathname } from "next/navigation";
import { useReducer, useState } from "react";

interface State {
  athleteData: AthleteUser;
  athleteDataError: ISelfRegistrationValidation;
}

type Value = string | number;

type Action =
  | { type: "SET_FIELD"; field: keyof AthleteUser; value: Value }
  | { type: "SET_ATHLETE_DATA"; athleteData: AthleteUser }
  | { type: "SET_ERROR"; errors: ISelfRegistrationValidation };

const initialState: State = {
  athleteData: {
    athleteName: "",
    athleteLastName: "",
    email: "",
    phoneNumber: "",
    genre: "",
    birthDate: "",
    registerDate: new Date().toISOString(),
    status: true,
    documentID: "",
  },
  athleteDataError: {
    nameError: false,
    lastNameError: false,
    emailError: false,
    phoneNumberError: false,
    genreError: false,
    birthDateError: false,
    documentIDError: false,
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        athleteData: { ...state.athleteData, [action.field]: action.value },
      };
    case "SET_ATHLETE_DATA":
      return {
        ...state,
        athleteData: action.athleteData,
      };
    case "SET_ERROR":
      return {
        ...state,
        athleteDataError: { ...state.athleteDataError, ...action.errors },
      };
  }
}

const ViewModel = () => {
  const [{ athleteData, athleteDataError }, dispatch] = useReducer(reducer, initialState);
  const pathname = usePathname();
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toogleModal, setToogleModal] = useState(false);

  const gymId = pathname.match(/\/self-registration\/(.*)/);
  const gymIdValue = gymId ? gymId[1] : null;

  const handleIsValidForm = () => {
    const errors: ISelfRegistrationValidation = {
      emailError: !isValidEmail(athleteData.email),
      nameError: !isValidName(athleteData.athleteName),
      lastNameError: !isValidName(athleteData.athleteLastName),
      phoneNumberError: !isNotEmpty(athleteData.phoneNumber),
      genreError: !isValidGenre(athleteData.genre),
      birthDateError: !isNotEmpty(athleteData.birthDate),
      documentIDError: !isValidDocumentID(athleteData.documentID),
    };

    dispatch({ type: "SET_ERROR", errors });
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const errors = handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      if (!gymIdValue) {
        setErrorModal(true);
        setErrorMessage("Ha ocurrido un error inesperado, por favor intentelo mas tarde.");
      }

      const registerAthleteByQRUserUseCase = container.get<RegisterAthleteByQRUseCase>(TYPES.RegisterAthleteByQRUseCase);

      const response = await registerAthleteByQRUserUseCase.execute(gymIdValue!, athleteData);

      if (!response) {
        console.log("error");
        return;
      }

      setToogleModal(true);
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message || "Ha ocurrido un error por favor intente de nuevo");
    }
  };

  const handleDownloadApp = () => {
    const userAgent = navigator.userAgent;
  
    if (/android/i.test(userAgent)) {
      window.open("https://play.google.com/store/apps/details?id=com.fithub.fithubconnectplusmobile&hl=es_CO", "_blank");
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.open("https://apps.apple.com/co/app/fithub-connect-plus/id6736966985", "_blank");
    } else if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
      window.open("https://apps.apple.com/co/app/fithub-connect-plus/id6736966985", "_blank");
    } else if (/Win32|Win64|Windows/.test(userAgent)) {
      window.open("https://play.google.com/store/apps/details?id=com.fithub.fithubconnectplusmobile&hl=es_CO", "_blank");
    } else {
      alert("Descarga la app desde tu dispositivo móvil o una tienda soportada.");
    }
  };

  const setField = (field: keyof AthleteUser, value: Value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  return {
    errorMessage,
    errorModal,
    athleteDataError,
    toogleModal,
    handleDownloadApp,
    setToogleModal,
    setErrorModal,
    setField,
    handleSubmit,
  };
};

export default ViewModel;
