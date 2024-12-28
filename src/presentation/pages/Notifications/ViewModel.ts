import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import { useEffect, useReducer, useState } from "react";

interface State {
  athletesList: PaginateResponseList;
  athleteUser: AthleteUser;
  selectedUsers: string[];
  channelName: string;
  isModalOpen: {
    selectedUsersModal: boolean;
    channelNameModal: boolean;
  };
}

type Value = string | number;

type Action =
  | { type: "SET_FIELD"; value: string }
  | { type: "SET_ATHLETES_LIST"; athletesList: PaginateResponseList }
  | { type: "SET_ATHLETE_USER"; athleteUser: AthleteUser }
  | { type: "SET_SELECTED_USERS"; selectedUsers: string[] }
  | { type: "TOGGLE_MODAL"; modalName: string; value?: boolean };

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
  selectedUsers: [],
  channelName: "",
  isModalOpen: {
    selectedUsersModal: false,
    channelNameModal: false,
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, channelName: action.value };
    case "SET_ATHLETES_LIST":
      return { ...state, athletesList: action.athletesList };
    case "SET_ATHLETE_USER":
      return { ...state, athleteUser: action.athleteUser };
    case "SET_SELECTED_USERS":
      return { ...state, selectedUsers: action.selectedUsers };
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
    default:
      return state;
  }
}

const chats = [
  {
    title: "General",
    description: "Último mensaje aquí",
    icon: "💬",
  },
  {
    title: "Grupo 1",
    description: "Hola, ¿cómo estás?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
];

const ViewModel = () => {
  const [{ athletesList, selectedUsers, isModalOpen, channelName }, dispatch] =
    useReducer(reducer, initialState);
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    getAthletesList();
  }, []);

  const handleChange = (value: string) => {
    setMessage(value);
  };

  const handleChatClick = (chat: any) => {
    setSelectedChat(chat);
  };

  const getAthletesList = async (params?: Partial<PaginateData>) => {
    try {
      setIsLoading(true);

      const numPage = Math.ceil(athletesList.items.length / 7) + 1;

      const getAthleteUserListUseCase =
        container.get<GetAthleteUserListUseCase>(
          TYPES.GetAthleteUserListUseCase
        );

      const response = await getAthleteUserListUseCase.execute({
        numRecordsPage: 7,
        numPage,
        ...params,
      });

      if (!response || response.items.length === 0) {
        setHasMore(false);
        console.log(athletesList);
        return;
      }

      const updatedItems = [...athletesList.items, ...response.items];

      dispatch({
        type: "SET_ATHLETES_LIST",
        athletesList: {
          totalRecords: response.totalRecords,
          items: updatedItems,
        },
      });
    } catch (error: any) {
      console.error(error);
      setError(true);
      setErrorMessage(
        error.response?.data?.message || "Error al obtener la lista de usuarios"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelection = (selected: string[]) => {
    const updatedUsers = selected
      .filter((id) => !selectedUsers.includes(id))
      .concat(selectedUsers.filter((id) => selected.includes(id)));

    dispatch({ type: "SET_SELECTED_USERS", selectedUsers: updatedUsers });
  };

  const handleCreateChannel = () => {
    if (selectedUsers.length === 0) {
      setError(true);
      setErrorMessage("Debes seleccionar al menos un usuario");
      return;
    }

    console.log("users selected", selectedUsers);

    const newChannel = {
      title: channelName,
      description: "Aun no hay mensajes",
      icon: "💬",
    };

    chats.push(newChannel);

    setSelectedChat(newChannel);

    toggleModal("selectedUsersModal", false);
    dispatch({ type: "SET_SELECTED_USERS", selectedUsers: [] });
    dispatch({ type: "SET_FIELD", value: "" });
  };

  const toggleModal = (modalName: string, value?: boolean) => {
    dispatch({ type: "TOGGLE_MODAL", modalName, value });
  };

  const setField = (value: string) => {
    dispatch({ type: "SET_FIELD", value });
  };

  const handleOpenSelectedUsersModal = () => {
    if (channelName === "") {
      setError(true);
      setErrorMessage("Debes ingresar un nombre para el canal");
      return;
    }

    toggleModal("selectedUsersModal", true);
    toggleModal("channelNameModal", false);
  };

  return {
    athletesList,
    message,
    chats,
    selectedChat,
    selectedUsers,
    isLoading,
    hasMore,
    error,
    errorMessage,
    isModalOpen,
    channelName,
    setField,
    setError,
    handleChatClick,
    handleChange,
    getAthletesList,
    handleUserSelection,
    handleCreateChannel,
    toggleModal,
    handleOpenSelectedUsersModal,
  };
};

export default ViewModel;
