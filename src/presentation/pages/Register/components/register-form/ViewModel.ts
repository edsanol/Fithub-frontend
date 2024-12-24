import { useEffect, useMemo, useReducer, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import container from "@/config/inversifyContainer";
import { RegisterGymUserUseCase } from "@/domain/useCases/GymUser/registerGymUserUseCase";
import { TYPES } from "@/config/types";
import {
  isNotEmpty,
  isValidEmail,
  isValidName,
  isValidNit,
  isValidPassword,
  isValidPhone,
} from "@/presentation/helpers";
import { IGymDataValidation } from "@/presentation/interfaces";
import Cookies from "js-cookie";
import { GymUser } from "@/domain/entities/GymUser";
import { GetAccessTypesUseCase } from "@/domain/useCases/GymUser/getAccessTypesUseCase";
import { AccessTypes } from "@/domain/models/AccessTypes";

interface State {
  gymData: GymUser;
  gymDataError: IGymDataValidation;
  accessTypes: AccessTypes[];
}

type Action =
  | {
      type: "SET_FIELD";
      field: keyof GymUser;
      value: string | number | number[];
    }
  | { type: "SET_ERROR"; errors: IGymDataValidation }
  | { type: "SET_ACCESS_TYPES"; accessTypes: AccessTypes[] };

const initialState: State = {
  gymData: {
    encryptedId: "",
    gymName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    registerDate: new Date().toISOString(),
    subscriptionPlan: "Basic",
    comments: "",
    nit: "",
    accessTypeIds: [],
  },
  gymDataError: {
    gymNameError: false,
    emailError: false,
    passwordError: false,
    addressError: false,
    phoneNumberError: false,
    nitError: false,
    accessTypeIdsError: false,
  },
  accessTypes: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        gymData: { ...state.gymData, [action.field]: action.value },
      };
    case "SET_ERROR":
      return {
        ...state,
        gymDataError: { ...state.gymDataError, ...action.errors },
      };
    case "SET_ACCESS_TYPES":
      return {
        ...state,
        accessTypes: action.accessTypes,
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const [{ gymData, gymDataError, accessTypes }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const router = useRouter();
  const { data: session } = useSession();

  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (session?.user.token) {
      Cookies.set("authToken", session.user.token, { expires: 1 });
      Cookies.set("refreshToken", session?.user.refreshToken, { expires: 1 });
    }
  }, [session]);

  useEffect(() => {
    getAccessTypes();
  }, []);

  const accessTypeIdsSet = useMemo(() => {
    return new Set(gymData.accessTypeIds!.map((id) => id.toString()));
  }, [gymData.accessTypeIds]);

  const setField = (
    field: keyof GymUser,
    value: string | number | number[]
  ) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleIsValidForm = async () => {
    const errors = {
      emailError: !isValidEmail(gymData.email),
      passwordError: !isValidPassword(gymData.password!),
      gymNameError: !isValidName(gymData.gymName),
      phoneNumberError: !isValidPhone(gymData.phoneNumber),
      nitError: !isValidNit(gymData.nit),
      addressError: !isNotEmpty(gymData.address),
      accessTypeIdsError: gymData.accessTypeIds!.length === 0,
    };

    dispatch({ type: "SET_ERROR", errors });
    return errors;
  };

  const getAccessTypes = async () => {
    try {
      const getAccessTypesUseCase = container.get<GetAccessTypesUseCase>(
        TYPES.GetAccessTypesUseCase
      );

      const response = await getAccessTypesUseCase.execute();

      if (!response) {
        setError("Error al obtener los tipos de acceso");
        return;
      }

      dispatch({ type: "SET_ACCESS_TYPES", accessTypes: response });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const errors = await handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      const registerGymUserUseCase = container.get<RegisterGymUserUseCase>(
        TYPES.RegisterGymUserUseCase
      );
      const response = await registerGymUserUseCase.execute(gymData);

      if (!response) {
        setError("Error al realizar el registro");
        console.log("error");
        return;
      }

      const responseNextAuth = await signIn("credentials", {
        email: gymData.email,
        password: gymData.password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        return;
      }

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(
        error.response?.data.message || "Error al realizar el registro"
      );
    }
  };

  return {
    handleSubmit,
    setField,
    setErrorModal,
    gymData,
    gymDataError,
    errorMessage,
    errorModal,
    error,
    accessTypes,
    accessTypeIdsSet,
  };
};

export default ViewModel;
