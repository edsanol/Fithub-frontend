import { useReducer, useState } from "react";

interface State {
  isModalOpen: {
    createModal: boolean;
    detailsModal: boolean;
    deleteModal: boolean;
    editModal: boolean;
    infoModal: boolean;
    categoryModal: boolean;
  };
  modalMode: "create" | "edit" | "view";
}

type Value = string | boolean;

type Action =
  | { type: "TOGGLE_MODAL"; modalName: string; value?: boolean }
  | { type: "SET_MODAL_MODE"; modalMode: "create" | "edit" | "view" };

const initialState: State = {
  isModalOpen: {
    createModal: false,
    detailsModal: false,
    deleteModal: false,
    editModal: false,
    infoModal: false,
    categoryModal: false,
  },
  modalMode: "create",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
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
  const [{ isModalOpen, modalMode }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const toggleModal = (modalName: string, value?: boolean) => {
    dispatch({ type: "TOGGLE_MODAL", modalName, value });
  };

  const setModalMode = (modalMode: "create" | "edit" | "view") => {
    dispatch({ type: "SET_MODAL_MODE", modalMode });
  };

  const handleOpenModal = async (modalName: string) => {
    switch (modalName) {
      case "editModal":
        setModalMode("edit");
        break;
      case "createModal":
        setModalMode("create");
        break;
      case "detailsModal":
        setModalMode("view");
        break;
      case "deleteModal":
        break;
    }

    toggleModal(modalName);
  };

  return {
    handleOpenModal,
    toggleModal,
    isModalOpen,
  };
};

export default ViewModel;
