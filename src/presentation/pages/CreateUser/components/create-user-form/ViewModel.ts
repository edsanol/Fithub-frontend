/* eslint-disable react-hooks/exhaustive-deps */
import {
  isNotEmpty,
  isValidDate,
  isValidDocumentID,
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
import { useReducer, useState } from "react";
import container from "@/config/inversifyContainer";
import { useEffect } from "react";
import { useDateGMT5 } from "@/hooks/useDateGMT5";

interface State {
  athleteData: AthleteUser;
  athleteDataError: IAthleteValidation;
  membership: MembershipByGymId[];
}

type Value = string | number;

type Action =
  | { type: "SET_FIELD"; field: keyof AthleteUser; value: Value }
  | { type: "SET_ATHLETE_DATA"; athleteData: AthleteUser }
  | { type: "SET_ERROR"; errors: IAthleteValidation }
  | { type: "SET_MEMBERSHIP"; membership: MembershipByGymId[] };

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
    startDate: "",
    endDate: "",
    membershipName: "",
    cost: 0,
    membershipId: 0,
    cardAccessCode: "",
    startMembershipDate: "",
    paymentAmount: 0,
    discount: 0,
  },
  athleteDataError: {
    nameError: false,
    lastNameError: false,
    emailError: false,
    phoneNumberError: false,
    genreError: false,
    birthDateError: false,
    startMembershipDateError: false,
    documentIDError: false,
  },
  membership: [],
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
    default:
      return state;
  }
}

const ViewModel = () => {
  const [{ athleteData, athleteDataError, membership }, dispatch] = useReducer(reducer, initialState);
  const pathname = usePathname();
  const router = useRouter();
  const dateGMT5 = useDateGMT5();

  const athleteId = pathname.match(/\/create-user\/(.*)/);
  const athleteIdValue = athleteId ? athleteId[1] : null;

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [paymentEnabled, setPaymentEnabled] = useState(false);
  const [discountEnabled, setDiscountEnabled] = useState(false);


  const validateAthleteData = (athleteData: AthleteUser, useStartMembershipDate: boolean): IAthleteValidation => ({
    emailError: !isValidEmail(athleteData.email),
    nameError: !isValidName(athleteData.athleteName),
    lastNameError: !isValidName(athleteData.athleteLastName),
    phoneNumberError: !isValidPhone(athleteData.phoneNumber),
    genreError: !isValidGenre(athleteData.genre),
    birthDateError: !isNotEmpty(athleteData.birthDate),
    documentIDError: !isValidDocumentID(athleteData.documentID),
    ...(useStartMembershipDate && {
      startMembershipDateError: !isValidDate(athleteData.startMembershipDate || athleteData.startDate!),
    }),
  });

  const handleIsValidForm = () => {
    const useStartMembershipDate = Boolean(!athleteIdValue);
    const errors = validateAthleteData(athleteData, useStartMembershipDate);
  
    dispatch({ type: "SET_ERROR", errors });
    return errors;
  };

  useEffect(() => {
    getMembershipByGymId();
  }, []);

  useEffect(() => {
    setDateByDefault();
  }, []);

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

      const { cost, endDate, membershipName, startDate, token, refreshToken, idGym, athleteId, stateAthlete, ...data } = athleteData;

      let response;

      if (athleteIdValue) {
        const editAthleteUserUseCase = container.get<EditAthleteUserUseCase>(TYPES.EditAthleteUserUseCase);

        response = await editAthleteUserUseCase.execute(Number(athleteIdValue), { ...data, cardAccessCode: ""});
      } else {
        const registerAthleteUserUseCase = container.get<RegisterAthleteUserUseCase>(TYPES.RegisterAthleteUserUseCase);

        response = await registerAthleteUserUseCase.execute({ ...data });
      }

      if (!response) {
        console.log("error");
        return;
      }

      router.push("/user-list");
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(
        error.response?.data?.message || "Error al registrar el usuario"
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
        setError("Error")
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

      const response = await GetMembershipByGymId.execute();

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

  const setDateByDefault = () => {
    dispatch({
      type: "SET_FIELD",
      field: "startMembershipDate",
      value: dateGMT5,
    });
  };

  const toogleCheckboxes = (state: string) => {
    if (state === "payment") {
      setPaymentEnabled(!paymentEnabled);
    } else {
      setDiscountEnabled(!discountEnabled);
    }
  };

  return {
    handleSubmit,
    getAthleteUserById,
    setField,
    setErrorModal,
    toogleCheckboxes,
    athleteIdValue,
    athleteData,
    athleteDataError,
    membership,
    errorModal,
    errorMessage,
    error,
    paymentEnabled,
    discountEnabled,
  };
};

export default ViewModel;
