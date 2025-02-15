/* eslint-disable react-hooks/exhaustive-deps */
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { UpdateMembershipToAthlete } from "@/domain/models/UpdateMembershipToAthlete";
import { useEffect, useReducer, useState } from "react";
import { useSession } from "next-auth/react";
import { PaginateData } from "@/domain/models/PaginateData";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { UpdateMembershipToAthleteUseCase } from "@/domain/useCases/AthleteUser/updateMembershipToAthlete";
import { GetAthleteUserByIdUseCase } from "@/domain/useCases/AthleteUser/getAtleteUserByIdUseCase";
import { DeleteAthleteUserUseCase } from "@/domain/useCases/AthleteUser/deleteAthleteUserUseCase";
import { GetMembershipByGymIdUseCase } from "@/domain/useCases/Membership/getMembershipByGymIdUseCase";
import { useRouter } from "next/navigation";
import { AthleteColumns } from "@/assets/constants";
import { useDateGMT5 } from "@/hooks/useDateGMT5";
import { isValidDate } from "@/presentation/helpers";
import { GetTotalPaidUseCase } from "@/domain/useCases/Membership/getTotalPaidUseCase";
import { TotalPaid } from "@/domain/models/TotalPaid";
import { RegisterPaymentAmount } from "@/domain/models/RegisterPaymentStatus";
import { RegisterPaymentAmountUseCase } from "@/domain/useCases/Membership/registerPaymentAmountUseCase";

interface State {
  athletesList: PaginateResponseList;
  athleteUser: AthleteUser;
  updateMembershipToAthlete: UpdateMembershipToAthlete;
  membership: MembershipByGymId[];
  totalPaid: TotalPaid;
  paymentAmount: RegisterPaymentAmount;
  isModalOpen: {
    detailsModal: boolean;
    deleteModal: boolean;
    editMembershipModal: boolean;
    paymentAmountModal: boolean;
  };
}

type Value = string | number;

type Action =
  | { type: "SET_ATHLETES_LIST"; athletesList: PaginateResponseList }
  | { type: "SET_ATHLETE_USER"; athleteUser: AthleteUser }
  | { type: "SET_UPDATE_MEMBERSHIP_FIELD"; field: keyof UpdateMembershipToAthlete; value: Value; }
  | { type: "SET_MEMBERSHIP"; membership: MembershipByGymId[] }
  | { type: "TOGGLE_MODAL"; modalName: string; value?: boolean }
  | { type: "CLOSE_MODAL" }
  | { type: "RESET_UPDATE_MEMBERSHIP" }
  | { type: "SET_TOTAL_PAID"; totalPaid: TotalPaid }
  | { type: "SET_PAYMENT_AMOUNT_FIELD"; field: keyof RegisterPaymentAmount; value: Value; };

const initialState: State = {
  athletesList: {
    totalRecords: 0,
    items: [],
  },
  athleteUser: {
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
    documentID: "",
  },
  updateMembershipToAthlete: {
    athleteId: 0,
    membershipId: 0,
    startMembershipDate: "",
    discount: 0,
    paymentAmount: 0,
  },
  membership: [],
  isModalOpen: {
    detailsModal: false,
    deleteModal: false,
    editMembershipModal: false,
    paymentAmountModal: false,
  },
  totalPaid: {
    totalPaid: 0,
    remainingAmount: 0,
  },
  paymentAmount: {
    athleteMembershipId: 0,
    paymentAmount: 0,
    paymentDate: "",
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ATHLETES_LIST":
      return { ...state, athletesList: action.athletesList };
    case "SET_ATHLETE_USER":
      return { ...state, athleteUser: action.athleteUser };
    case "SET_UPDATE_MEMBERSHIP_FIELD":
      return {
        ...state,
        updateMembershipToAthlete: {
          ...state.updateMembershipToAthlete,
          [action.field]: action.value,
        },
      };
    case "SET_MEMBERSHIP":
      return { ...state, membership: action.membership };
    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: {
          ...state.isModalOpen,
          [action.modalName]:
            action.value ??
            !state.isModalOpen[action.modalName as keyof State["isModalOpen"]],
        },
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: {
          ...state.isModalOpen,
          detailsModal: false,
          deleteModal: false,
          editMembershipModal: false,
          paymentAmountModal: false,
        },
      };
    case "RESET_UPDATE_MEMBERSHIP":
      return {
        ...state,
        updateMembershipToAthlete: initialState.updateMembershipToAthlete,
      };
    case "SET_TOTAL_PAID":
      return {
        ...state,
        totalPaid: action.totalPaid,
      };
    case "SET_PAYMENT_AMOUNT_FIELD":
      return {
        ...state,
        paymentAmount: {
          ...state.paymentAmount,
          [action.field]: action.value,
        },
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const [{athletesList, athleteUser, updateMembershipToAthlete, membership, isModalOpen, totalPaid, paymentAmount}, dispatch] = useReducer(reducer, initialState);
  const { data: session } = useSession();
  const dateGMT5 = useDateGMT5();
  const router = useRouter();

  const [idGym, setIdGym] = useState<number>(0);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [paymentEnabled, setPaymentEnabled] = useState(false);
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [filterParams, setFilterParams] = useState<PaginateData>({
    numPage: 1,
    textFilter: "",
    numFilter: undefined,
  });
  

  useEffect(() => {
    if (session && session.user.gymId !== idGym) {
      setIdGym(session.user.gymId);
    }
  }, [session]);

  useEffect(() => {
    if (idGym !== 0) {
      getMembershipByGymId();
    }
  }, [idGym]);

  useEffect(() => {
    if (isModalOpen.editMembershipModal && athleteUser.athleteId !== 0) {
      setDateByDefault(athleteUser);
    }
  }, [isModalOpen.editMembershipModal, athleteUser]);

  useEffect(() => {
    if (isModalOpen.paymentAmountModal && paymentAmount.athleteMembershipId !== 0 && !paymentAmount.paymentDate) {
      dispatch({ type: "SET_PAYMENT_AMOUNT_FIELD", field: "paymentDate", value: dateGMT5 });
    }
  }, [isModalOpen.paymentAmountModal, paymentAmount.athleteMembershipId]);

  const handleSubmit = async (params: Partial<PaginateData>) => {
    try {
      const getAthleteUserListUseCase = container.get<GetAthleteUserListUseCase>(TYPES.GetAthleteUserListUseCase);

      const response = await getAthleteUserListUseCase.execute({
        numRecordsPage: 7,
        ...filterParams,
        ...params,
      });

      if (!response) {
        console.log("error");
        return;
      }

      response.items.forEach(mapperAthleteUser);

      dispatch({ type: "SET_ATHLETES_LIST", athletesList: response });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const mapperAthleteUser = (athleteUser: AthleteUser) => {
    if (!athleteUser.startDate || !athleteUser.endDate) {
      athleteUser.stateAthlete = "Inactivo";
      return;
    }

    const startDate = new Date(athleteUser.startDate);
    const endDate = new Date(athleteUser.endDate);
    const today = new Date(dateGMT5);

    if (startDate > endDate) {
      athleteUser.stateAthlete = "Inactivo";
      return;
    }

    const fiveDaysBeforeEnd = new Date(endDate);
    fiveDaysBeforeEnd.setDate(fiveDaysBeforeEnd.getDate() - 5);

    if (today >= fiveDaysBeforeEnd && today <= endDate) {
      athleteUser.stateAthlete = "Por expirar";
      return;
    }

    if (today > endDate) {
      athleteUser.stateAthlete = "Inactivo";
      return;
    }

    athleteUser.stateAthlete = "Activo";
  };

  const updateMembership = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const dateError = isValidDate(updateMembershipToAthlete.startMembershipDate!);

      if (!dateError) {
        setErrorModal(true);
        setErrorMessage("La fecha de inicio de membresía no es válida");
        return;
      }

      const updateMembership = container.get<UpdateMembershipToAthleteUseCase>(TYPES.UpdateMembershipToAthleteUseCase);

      const response = await updateMembership.execute(updateMembershipToAthlete);

      if (!response) {
        console.log("error");
        return;
      }

      await handleSubmit({ numPage: 1 });

      dispatch({ type: "CLOSE_MODAL" });
      dispatch({ type: "RESET_UPDATE_MEMBERSHIP" });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
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

      dispatch({ type: "SET_ATHLETE_USER", athleteUser: response });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const deleteAthleteUser = async (athleteId: number) => {
    try {
      const deleteAthleteUserUseCase = container.get<DeleteAthleteUserUseCase>(
        TYPES.DeleteAthleteUserUseCase
      );

      const response = await deleteAthleteUserUseCase.execute(athleteId);

      if (!response) {
        console.log("error");
        return;
      }

      await handleSubmit({ numPage: 1 });

      dispatch({ type: "CLOSE_MODAL" });
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

  const handleSetNumPage = async (numPage: number) => {
    setFilterParams((prev) => {
      let updatedTextFilter = prev.textFilter;
  
      if ([8, 9, 10].includes(prev.numFilter || 0) && !prev.textFilter) {
        updatedTextFilter = "Filtrando...";
      }
  
      const updatedParams = { ...prev, numPage, textFilter: updatedTextFilter, download: false };
      handleSubmit(updatedParams);
      return updatedParams;
    });
  };  

  const handleSetTextFilter = async (textFilter: string) => {
    setFilterParams((prev) => ({ ...prev, textFilter, numFilter: 1, numPage: 1 }));
    await handleSubmit({ textFilter, numFilter: 1 });
  };

  const handleSetStatusFilter = async (statusFilter: number) => {
    setFilterParams((prev) => ({ ...prev, numFilter: statusFilter, numPage: 1 }));
    await handleSubmit({ numFilter: statusFilter, textFilter: "Filtrando..." });
  };

  const handleRedirect = (athleteId: number) => {
    router.push(`/create-user/${athleteId}`);
  };

  const setField = (field: keyof UpdateMembershipToAthlete, value: Value) => {
    dispatch({ type: "SET_UPDATE_MEMBERSHIP_FIELD", field, value });
  };

  const toggleModal = (modalName: string, value?: boolean) => {
    dispatch({ type: "TOGGLE_MODAL", modalName, value });
  };

  const handleOpenModal = async (athleteId: number, modalName: "detailsModal" | "deleteModal" | "editMembershipModal" | "paymentAmountModal") => {
    switch (modalName) {
      case "detailsModal":
        await getAthleteUserById(athleteId);
        toggleModal(modalName);
        break;
      case "deleteModal":
        await getAthleteUserById(athleteId);
        toggleModal(modalName);
        break;
      case "editMembershipModal":
        dispatch({ type: "SET_UPDATE_MEMBERSHIP_FIELD", field: "athleteId", value: athleteId });
        await getAthleteUserById(athleteId);
        toggleModal(modalName);
        break;
      case "paymentAmountModal":
        await getTotalPaid(athleteId);
        dispatch({ type: "SET_PAYMENT_AMOUNT_FIELD", field: "athleteMembershipId", value: athleteId });
        toggleModal(modalName);
        break;
      default:
        break;
    }
  };

  const setDateByDefault = (athlete: AthleteUser) => {
    if (athlete?.startDate && athlete?.endDate) {
      dispatch({
        type: "SET_UPDATE_MEMBERSHIP_FIELD",
        field: "startMembershipDate",
        value: athlete.endDate,
      });

      return;
    }

    dispatch({
      type: "SET_UPDATE_MEMBERSHIP_FIELD",
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

  const getTotalPaid = async (id: number) => {
    try {
      const getTotalPaidUseCase = container.get<GetTotalPaidUseCase>(
        TYPES.GetTotalPaidUseCase
      );

      const response = await getTotalPaidUseCase.execute(id);

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_TOTAL_PAID", totalPaid: response });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const setPaymentAmountField = (field: keyof RegisterPaymentAmount, value: Value) => {
    dispatch({ type: "SET_PAYMENT_AMOUNT_FIELD", field, value });
  };

  const registerPaymentAmount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const registerPaymentAmountUseCase = container.get<RegisterPaymentAmountUseCase>(TYPES.RegisterPaymentAmountUseCase);

      const response = await registerPaymentAmountUseCase.execute(paymentAmount);

      if (!response) {
        console.log("error");
        return;
      }

      await handleSubmit({ numPage: 1 });
      dispatch({ type: "CLOSE_MODAL" });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response?.data?.message);
    }
  };

  return {
    athletesList,
    athleteUser,
    isModalOpen,
    membership,
    AthleteColumns,
    errorModal,
    errorMessage,
    updateMembershipToAthlete,
    paymentEnabled,
    discountEnabled,
    totalPaid,
    paymentAmount,
    setErrorModal,
    deleteAthleteUser,
    handleOpenModal,
    handleRedirect,
    setField,
    handleSetNumPage,
    handleSetTextFilter,
    handleSetStatusFilter,
    toggleModal,
    updateMembership,
    toogleCheckboxes,
    setPaymentAmountField,
    registerPaymentAmount,
  };
};

export default ViewModel;
