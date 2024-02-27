/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useState } from "react";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteColumns } from "@/assets/constants";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { Membership } from "@/domain/entities/Membership";
import { IMembershipValidation } from "@/presentation/interfaces";
import { isNotEmpty, isValidName, isValidNumber } from "@/presentation/helpers";
import { RegisterMembershipUseCase } from "@/domain/useCases/Membership/registerMembershipUseCase";
import { useSession } from "next-auth/react";
import { GetMembershipListUseCase } from "@/domain/useCases/Membership/getMembershipListUseCase";
import { MembershipColumns } from "@/assets/constants";
import { useEffect } from "react";
import { GetMembershipByIdUseCase } from "@/domain/useCases/Membership/getMembershipByIdUseCase";
import { EditMembershipUseCase } from "@/domain/useCases/Membership/editMembershipUseCase";
import { DeleteMembershipUseCase } from "@/domain/useCases/Membership/deleteMembershipUseCase";
import { IMembershipModal } from "@/presentation/interfaces/Membership/IMembership";

interface State {
  membershipList: PaginateResponseList;
  membership: Membership;
  membershipError: IMembershipValidation;
  isModalOpen: {
    createModal: boolean;
    detailsModal: boolean;
    deleteModal: boolean;
    editModal: boolean;
    infoModal: boolean;
  };
  modalMode: "create" | "edit" | "view";
}

type Value = string | boolean;

type Action =
  | { type: "SET_FIELD"; field: keyof Membership; value: Value }
  | { type: "SET_MEMBERSHIP_LIST"; membershipList: PaginateResponseList }
  | { type: "SET_MEMBERSHIP"; membership: Membership }
  | { type: "SET_MEMBERSHIP_ERROR"; membershipError: IMembershipValidation }
  | { type: "TOGGLE_MODAL"; modalName: string; value?: boolean }
  | { type: "SET_MODAL_MODE"; modalMode: "create" | "edit" | "view" };

const initialState: State = {
  membershipList: {
    totalRecords: 0,
    items: [],
  },
  membership: {
    membershipID: 0,
    membershipName: "",
    cost: 0,
    durationInDays: 0,
    description: "",
    status: true,
  },
  membershipError: {
    membershipNameError: false,
    costError: false,
    durationInDaysError: false,
    descriptionError: false,
  },
  isModalOpen: {
    createModal: false,
    detailsModal: false,
    deleteModal: false,
    editModal: false,
    infoModal: false,
  },
  modalMode: "create",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        membership: {
          ...state.membership,
          [action.field]: action.value,
        },
      };
    case "SET_MEMBERSHIP_LIST":
      return {
        ...state,
        membershipList: action.membershipList,
      };
    case "SET_MEMBERSHIP":
      return {
        ...state,
        membership: action.membership,
      };
    case "SET_MEMBERSHIP_ERROR":
      return {
        ...state,
        membershipError: action.membershipError,
      };
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
    case "SET_MODAL_MODE":
      return {
        ...state,
        modalMode: action.modalMode,
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const [
    { membershipList, membership, membershipError, isModalOpen, modalMode },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { data: session } = useSession();

  const [idGym, setIdGym] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (session && session.user.gymId !== idGym) {
      setIdGym(session.user.gymId);
    }
  }, [session]);

  useEffect(() => {
    if (idGym !== 0) {
      getPaginateMembershipList();
    }
  }, [idGym]);

  const handleIsValidForm = () => {
    const errors: IMembershipValidation = {
      membershipNameError: !isValidName(membership.membershipName),
      costError: !isValidNumber(membership.cost.toString()),
      durationInDaysError: !isValidNumber(membership.durationInDays.toString()),
      descriptionError: !isNotEmpty(membership.description),
    };

    dispatch({ type: "SET_MEMBERSHIP_ERROR", membershipError: errors });
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const errors = handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      if (idGym === 0) {
        console.log("error");
        return;
      }

      let response;

      if (modalMode === "edit") {
        const editMembershipUseCase = container.get<EditMembershipUseCase>(
          TYPES.EditMembershipUseCase
        );

        response = await editMembershipUseCase.execute(
          membership.membershipID!,
          {
            ...membership,
            idGym,
          }
        );
      } else {
        const registerMembershipUseCase =
          container.get<RegisterMembershipUseCase>(
            TYPES.RegisterMembershipUseCase
          );

        response = await registerMembershipUseCase.execute({
          ...membership,
          idGym,
        });
      }

      if (!response) {
        console.log("error");
        return;
      }

      await getPaginateMembershipList();
      
      modalMode === "create" ? toggleModal("createModal", false) : toggleModal("editModal", false);
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const getPaginateMembershipList = async () => {
    try {
      const getMembershipListUseCase = container.get<GetMembershipListUseCase>(
        TYPES.GetMembershipListUseCase
      );

      const response = await getMembershipListUseCase.execute({
        textFilter: idGym.toString(),
        numRecordsPage: 7,
      });

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_MEMBERSHIP_LIST", membershipList: response });
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const getMembershipById = async (id: number) => {
    try {
      const getMembershipByIdUseCase = container.get<GetMembershipByIdUseCase>(
        TYPES.GetMembershipByIdUseCase
      );

      const response = await getMembershipByIdUseCase.execute(id);

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_MEMBERSHIP", membership: response });
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const deleteMembership = async (id: number) => {
    try {
      const deleteMembershipUseCase = container.get<DeleteMembershipUseCase>(
        TYPES.DeleteMembershipUseCase
      );

      const response = await deleteMembershipUseCase.execute(id);

      if (!response) {
        console.log("error");
        return;
      }

      await getPaginateMembershipList();
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const toggleModal = (modalName: string, value?: boolean) => {
    dispatch({ type: "TOGGLE_MODAL", modalName, value });
  };

  const setModalMode = (modalMode: "create" | "edit" | "view") => {
    dispatch({ type: "SET_MODAL_MODE", modalMode });
  };

  const handleOpenModal = async (modalName: IMembershipModal, id?: number) => {
    switch (modalName) {
      case "editModal":
        await getMembershipById(id!);
        setModalMode("edit");
        break;
      case "createModal":
        dispatch({ type: "SET_MEMBERSHIP", membership: { membershipID: 0, membershipName: "", cost: 0, durationInDays: 0, description: "", status: true, }});
        setModalMode("create");
        break;
      case "detailsModal":
        await getMembershipById(id!);
        setModalMode("view");
        break;
      case "deleteModal":
        await getMembershipById(id!);
        break;
    }

    toggleModal(modalName);
  };

  const setField = (field: keyof Membership, value: Value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  return {
    handleSubmit,
    setField,
    deleteMembership,
    handleOpenModal,
    toggleModal,
    setError,
    membership,
    MembershipColumns,
    membershipError,
    membershipList,
    AthleteColumns,
    isModalOpen,
    modalMode,
    error,
    errorMessage,
  };
};

export default ViewModel;
