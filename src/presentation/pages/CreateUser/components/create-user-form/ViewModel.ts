/* eslint-disable react-hooks/exhaustive-deps */
import {
  isNotEmpty,
  isValidCardCode,
  isValidEmail,
  isValidGenre,
  isValidName,
  isValidPhone,
} from "@/presentation/helpers";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { EditAthleteUserUseCase } from "@/domain/useCases/AthleteUser/editAthleteUserUseCase";
import { GetAthleteUserByIdUseCase } from "@/domain/useCases/AthleteUser/getAtleteUserByIdUseCase";
import { GetMembershipByGymIdUseCase } from "@/domain/useCases/Membership/getMembershipByGymIdUseCase";
import { IAthleteValidation } from "@/presentation/interfaces";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";
import { RegisterAthleteUserUseCase } from "@/domain/useCases/AthleteUser/registerAthleteUserUseCase";
import { TYPES } from "@/config/types";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useReducer, useState } from "react";
import container from "@/config/inversifyContainer";
import { useEffect } from "react";

interface State {
  athleteData: AthleteUser;
  athleteDataError: IAthleteValidation;
  membership: MembershipByGymId[];
  isCheck: boolean;
}

type Value = string | number;

type Action =
  | { type: "SET_FIELD"; field: keyof AthleteUser; value: Value }
  | { type: "SET_ATHLETE_DATA"; athleteData: AthleteUser }
  | { type: "SET_ERROR"; errors: IAthleteValidation }
  | { type: "SET_MEMBERSHIP"; membership: MembershipByGymId[] }
  | { type: "SET_CHECK"; isCheck: boolean };

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
    startDate: "",
    endDate: "",
    membershipName: "",
    cost: 0,
    membershipId: 0,
    cardAccessCode: "",
  },
  athleteDataError: {
    nameError: false,
    lastNameError: false,
    emailError: false,
    phoneNumberError: false,
    genreError: false,
    birthDateError: false,
    cardAccessCodeError: false,
  },
  membership: [],
  isCheck: false,
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
    case "SET_MEMBERSHIP":
      return {
        ...state,
        membership: action.membership,
      };
    case "SET_CHECK":
      return {
        ...state,
        isCheck: action.isCheck,
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const [{ athleteData, athleteDataError, membership, isCheck }, dispatch] =
    useReducer(reducer, initialState);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const athleteId = pathname.match(/\/create-user\/(.*)/);
  const athleteIdValue = athleteId ? athleteId[1] : null;

  const [idGym, setIdGym] = useState<number>(0);
  const [gymName, setGymName] = useState<string>("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleIsValidForm = () => {
    const errors: IAthleteValidation = {
      emailError: !isValidEmail(athleteData.email),
      nameError: !isValidName(athleteData.athleteName),
      lastNameError: !isValidName(athleteData.athleteLastName),
      phoneNumberError: !isValidPhone(athleteData.phoneNumber),
      genreError: !isValidGenre(athleteData.genre),
      birthDateError: !isNotEmpty(athleteData.birthDate),
      cardAccessCodeError: !isValidCardCode(athleteData.cardAccessCode),
    };

    dispatch({ type: "SET_ERROR", errors });
    return errors;
  };

  useEffect(() => {
    if (session && session.user.gymId !== idGym) {
      setIdGym(session.user.gymId);
      setGymName(session.user.gymName);
    }
  }, [session]);

  useEffect(() => {
    if (idGym !== 0) {
      getMembershipByGymId();
    }
  }, [idGym]);

  useEffect(() => {
    if (athleteIdValue) {
      getAthleteUserById(Number(athleteIdValue));
    }
  }, [athleteIdValue]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const errors = handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      if (idGym === 0 || gymName === "") {
        console.log("error");
        return;
      }

      const { cost, endDate, membershipName, startDate, ...data } = athleteData;

      let response;

      if (athleteIdValue) {
        const editAthleteUserUseCase = container.get<EditAthleteUserUseCase>(
          TYPES.EditAthleteUserUseCase
        );

        response = await editAthleteUserUseCase.execute(
          Number(athleteIdValue),
          {
            ...data,
            idGym,
            gymName,
          }
        );
      } else {
        const registerAthleteUserUseCase =
          container.get<RegisterAthleteUserUseCase>(
            TYPES.RegisterAthleteUserUseCase
          );

        response = await registerAthleteUserUseCase.execute({
          ...data,
          idGym,
          gymName,
        });
      }

      if (!response) {
        console.log("error");
        return;
      }

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(
        error.response.data.message || "Error al registrar el usuario"
      );
    }
  };

  const getAthleteUserById = async (id: number) => {
    try {
      const getAthleteUserById = container.get<GetAthleteUserByIdUseCase>(
        TYPES.GetAthleteUserByIdUseCase
      );

      const response = await getAthleteUserById.execute(id);

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_ATHLETE_DATA", athleteData: response });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const getMembershipByGymId = async () => {
    try {
      const GetMembershipByGymId = container.get<GetMembershipByGymIdUseCase>(
        TYPES.GetMembershipByGymIdUseCase
      );

      const response = await GetMembershipByGymId.execute(idGym);

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_MEMBERSHIP", membership: response });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const setField = (field: keyof AthleteUser, value: Value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const setCheck = (isCheck: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_CHECK", isCheck: isCheck.target.checked });
  };

  return {
    handleSubmit,
    getAthleteUserById,
    setField,
    setCheck,
    setErrorModal,
    athleteIdValue,
    athleteData,
    athleteDataError,
    membership,
    isCheck,
    errorModal,
    errorMessage,
  };
};

export default ViewModel;
