/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";
import { useSession } from "next-auth/react";
import { GymUser } from "@/domain/entities/GymUser";
import { IGymDataValidation } from "@/presentation/interfaces";
import { useRouter } from "next/navigation";
import {
  isNotEmpty,
  isValidEmail,
  isValidName,
  isValidNit,
  isValidPhone,
} from "@/presentation/helpers";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { EditGymUserUseCase } from "@/domain/useCases/GymUser/editGymUserUseCase";
import { GetGymUserByIdUseCase } from "@/domain/useCases/GymUser/getGymUserByIdUseCase";

interface State {
  gymUserData: GymUser;
  gymUserDataError: IGymDataValidation;
}

type Action =
  | { type: "SET_FIELD"; field: keyof GymUser; value: string }
  | { type: "SET_GYM_USER_DATA"; gymUserData: GymUser }
  | { type: "SET_ERROR"; errors: IGymDataValidation };

const initialState: State = {
  gymUserData: {
    gymName: "",
    email: "",
    address: "",
    phoneNumber: "",
    registerDate: new Date().toISOString(),
    subscriptionPlan: "",
    comments: "",
    nit: "",
  },
  gymUserDataError: {
    gymNameError: false,
    emailError: false,
    addressError: false,
    phoneNumberError: false,
    nitError: false,
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        gymUserData: {
          ...state.gymUserData,
          [action.field]: action.value,
        },
      };
    case "SET_GYM_USER_DATA":
      return {
        ...state,
        gymUserData: action.gymUserData,
      };
    case "SET_ERROR":
      return {
        ...state,
        gymUserDataError: action.errors,
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const [{ gymUserData, gymUserDataError }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { data: session } = useSession();
  const router = useRouter();

  const [isClicked, setIsClicked] = useState(false);
  const [idGym, setIdGym] = useState<number>(0);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session && session.user.gymId !== idGym) {
      setIdGym(session.user.gymId);
    }
  }, [session]);

  useEffect(() => {
    if (idGym !== 0) {
      loadGymUserData(idGym);
    }
  }, [idGym]);

  const loadGymUserData = async (id: number) => {
    try {
      const getGymUserByIdUseCase = container.get<GetGymUserByIdUseCase>(
        TYPES.GetGymUserByIdUseCase
      );

      const response = await getGymUserByIdUseCase.execute(id);

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_GYM_USER_DATA", gymUserData: response });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleIsValidForm = async () => {
    const errors: IGymDataValidation = {
      emailError: !isValidEmail(gymUserData.email),
      gymNameError: !isValidName(gymUserData.gymName),
      phoneNumberError: !isValidPhone(gymUserData.phoneNumber),
      nitError: !isValidNit(gymUserData.nit),
      addressError: !isNotEmpty(gymUserData.address),
    };

    dispatch({ type: "SET_ERROR", errors });
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const errors = await handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      if (idGym === 0) {
        console.log("error");
        return;
      }

      const editGymUserUseCase = container.get<EditGymUserUseCase>(
        TYPES.EditGymUserUseCase
      );

      const response = await editGymUserUseCase.execute(idGym, gymUserData);

      if (!response) {
        console.log("error");
        return;
      }

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const setField = (field: keyof GymUser, value: string) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  return {
    handleSubmit,
    setField,
    handleClick,
    setErrorModal,
    isClicked,
    gymUserData,
    gymUserDataError,
    errorModal,
    errorMessage,
  };
};

export default ViewModel;
