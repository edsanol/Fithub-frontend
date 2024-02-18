import { useEffect, useReducer } from "react";
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
import { cipherData } from "@/config/secureData";
import Cookies from "js-cookie";
import { GymUser } from "@/domain/entities/GymUser";

interface State {
  gymData: GymUser;
  gymDataError: IGymDataValidation;
}

type Action =
  | { type: "SET_FIELD"; field: keyof GymUser; value: string }
  | { type: "SET_ERROR"; errors: IGymDataValidation };

const initialState: State = {
  gymData: {
    gymName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    registerDate: new Date().toISOString(),
    subscriptionPlan: "Premium",
    comments: "",
    nit: "",
  },
  gymDataError: {
    gymNameError: false,
    emailError: false,
    passwordError: false,
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
        gymData: { ...state.gymData, [action.field]: action.value },
      };
    case "SET_ERROR":
      return {
        ...state,
        gymDataError: { ...state.gymDataError, ...action.errors },
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const [{ gymData, gymDataError }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.token) {
      Cookies.set("authToken", session.user.token, { expires: 1 });
      const tokenEncrypted = cipherData(session?.user.refreshToken);
      Cookies.set("refreshToken", tokenEncrypted, { expires: 1 });
    }
  }, [session]);

  const setField = (field: keyof GymUser, value: string) => {
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

      const registerGymUserUseCase = container.get<RegisterGymUserUseCase>(
        TYPES.RegisterGymUserUseCase
      );
      const response = await registerGymUserUseCase.execute(gymData);

      if (!response) {
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
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSubmit,
    setField,
    gymDataError,
  };
};

export default ViewModel;
