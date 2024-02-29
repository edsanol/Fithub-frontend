/* eslint-disable react-hooks/exhaustive-deps */
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { UpdateMembershipToAthlete } from "@/domain/models/UpdateMembershipToAthlete";
import React, { useEffect, useReducer, useState } from "react";
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

interface State {
  athletesList: PaginateResponseList;
  athleteUser: AthleteUser;
  updateMembershipToAthlete: UpdateMembershipToAthlete;
  membership: MembershipByGymId[];
  isModalOpen: {
    detailsModal: boolean;
    deleteModal: boolean;
    editMembershipModal: boolean;
  };
}

type Value = string | number;

type Action =
  | { type: "SET_ATHLETES_LIST"; athletesList: PaginateResponseList }
  | { type: "SET_ATHLETE_USER"; athleteUser: AthleteUser }
  | { type: "SET_UPDATE_MEMBERSHIP_FIELD"; field: keyof UpdateMembershipToAthlete; value: Value }
  | { type: "SET_MEMBERSHIP"; membership: MembershipByGymId[] }
  | { type: "TOGGLE_MODAL"; modalName: string; value?: boolean }
  | { type: "CLOSE_MODAL"; };

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
  },
  updateMembershipToAthlete: {
    athleteId: 0,
    membershipId: 0,
  },
  membership: [],
  isModalOpen: {
    detailsModal: false,
    deleteModal: false,
    editMembershipModal: false,
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ATHLETES_LIST":
      return { ...state, athletesList: action.athletesList };
    case "SET_ATHLETE_USER":
      return { ...state, athleteUser: action.athleteUser };
    case "SET_UPDATE_MEMBERSHIP_FIELD":
      return { ...state, updateMembershipToAthlete: { ...state.updateMembershipToAthlete, [action.field]: action.value }};
    case "SET_MEMBERSHIP":
      return { ...state, membership: action.membership };
    case "TOGGLE_MODAL":
      return { ...state, isModalOpen: { ...state.isModalOpen, [action.modalName]: action.value ?? !state.isModalOpen[action.modalName as keyof State["isModalOpen"]] }};
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: { ...state.isModalOpen, detailsModal: false, deleteModal: false, editMembershipModal: false }};
    default:
      return state;
  }
}

const ViewModel = () => {
  const [{ athletesList, athleteUser, updateMembershipToAthlete, membership, isModalOpen }, dispatch] = useReducer(reducer, initialState);
  const { data: session } = useSession();
  const router = useRouter();

  const [idGym, setIdGym] = useState<number>(0);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const handleSubmit = async (params: Partial<PaginateData>) => {
    try {
      const getAthleteUserListUseCase =
        container.get<GetAthleteUserListUseCase>(
          TYPES.GetAthleteUserListUseCase
        );

      const response = await getAthleteUserListUseCase.execute({
        numRecordsPage: 7,
        ...params,
      });

      if (!response) {
        console.log("error");
        return;
      }

      response.items.map((athlete) => {
        mapperAthleteUser(athlete);
      });

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

    if (startDate > endDate) {
      athleteUser.stateAthlete = "Inactivo";
    }

    athleteUser.stateAthlete = "Activo";
  };

  const updateMembership = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updateMembership = container.get<UpdateMembershipToAthleteUseCase>(
        TYPES.UpdateMembershipToAthleteUseCase
      );

      const response = await updateMembership.execute(
        updateMembershipToAthlete
      );

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

  const handleSetNumPage = async (numPage: number) => {
    await handleSubmit({ numPage });
  };

  const handleSetTextFilter = async (textFilter: string) => {
    await handleSubmit({ textFilter, numFilter: 1 });
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

  const handleOpenModal = async (athleteId: number, modalName: "detailsModal" | "deleteModal" | "editMembershipModal") => {
    await getAthleteUserById(athleteId);
    toggleModal(modalName);

    if (modalName === "editMembershipModal") {
      dispatch({ type: "SET_UPDATE_MEMBERSHIP_FIELD", field: "athleteId", value: athleteId });
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
    setErrorModal,
    deleteAthleteUser,
    handleOpenModal,
    handleRedirect,
    setField,
    handleSetNumPage,
    handleSetTextFilter,
    toggleModal,
    updateMembership,
  };
};

export default ViewModel;
