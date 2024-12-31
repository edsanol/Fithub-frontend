import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import { useEffect, useReducer, useState } from "react";
import { debounce } from "lodash";
import { GetMembershipByGymIdUseCase } from "@/domain/useCases/Membership/getMembershipByGymIdUseCase";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";
import { EmojiClickData } from "emoji-picker-react";
import { CreateChannelUseCase } from "@/domain/useCases/Channel/CreateChannelUseCase";
interface State {
  athletesList: PaginateResponseList;
  athleteUser: AthleteUser;
  selectedUsers: string[];
  channelName: string;
  membership: MembershipByGymId[];
  isModalOpen: {
    selectedUsersModal: boolean;
    channelNameModal: boolean;
  };
  textFilter: string;
}

type Value = string | number;

type Action =
  | { type: "SET_FIELD"; value: string }
  | { type: "SET_ATHLETES_LIST"; athletesList: PaginateResponseList }
  | { type: "SET_ATHLETE_USER"; athleteUser: AthleteUser }
  | { type: "SET_SELECTED_USERS"; selectedUsers: string[] }
  | { type: "TOGGLE_MODAL"; modalName: string; value?: boolean }
  | { type: "SET_TEXT_FILTER"; value: string }
  | { type: "SET_MEMBERSHIP"; membership: MembershipByGymId[] };

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
  membership: [],
  channelName: "",
  isModalOpen: {
    selectedUsersModal: false,
    channelNameModal: false,
  },
  textFilter: "",
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
    case "SET_MEMBERSHIP":
      return { ...state, membership: action.membership };
    case "SET_TEXT_FILTER":
      return { ...state, textFilter: action.value };
    case "TOGGLE_MODAL":
      return { ...state, isModalOpen: { ...state.isModalOpen, [action.modalName]: action.value ?? !state.isModalOpen[action.modalName as keyof State["isModalOpen"]] }};
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
  const [{ athletesList, selectedUsers, isModalOpen, channelName, membership, textFilter }, dispatch] = useReducer(reducer, initialState);
  const [textMessage, setTextMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  useEffect(() => {
    getAthletesList();
  }, []);

  useEffect(() => {
    getMembershipByGymId();
  }, []);

  const handleTextMessage = (value: string) => {
    setTextMessage(value);
  };

  const handleChatClick = (chat: any) => {
    setSelectedChat(chat);
  };

  const getAthletesList = async (params?: Partial<PaginateData>, reset = false) => {
    try {
      setIsLoading(true);

      const filterByName = params?.textFilter ?? textFilter;
      const numPage = reset ? 1 : Math.ceil(athletesList.items.length / 7) + 1;

      const getAthleteUserListUseCase = container.get<GetAthleteUserListUseCase>(TYPES.GetAthleteUserListUseCase);

      const requestParams = {
        numRecordsPage: 7,
        numPage,
        textFilter: filterByName,
        ...(filterByName ? { numFilter: 1 } : {}),
        ...params,
      };

      const response = await getAthleteUserListUseCase.execute(requestParams);

      if (!response || response.items.length === 0) {
        setHasMore(false);
        return;
      }

      const updatedItems = reset
        ? response.items
        : [...athletesList.items, ...response.items];

      dispatch({
        type: "SET_ATHLETES_LIST",
        athletesList: {
          totalRecords: response.totalRecords,
          items: updatedItems,
        },
      });

      if (reset) {
        setHasMore(true);
      }
    } catch (error: any) {
      console.error(error);
      setError(true);
      setErrorMessage(error.response?.data?.message || "Error al obtener la lista de usuarios");
    } finally {
      setIsLoading(false);
    }
  };

  const getMembershipByGymId = async () => {
    try {
      const getMembershipByGymId = container.get<GetMembershipByGymIdUseCase>(TYPES.GetMembershipByGymIdUseCase);

      const response = await getMembershipByGymId.execute();

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_MEMBERSHIP", membership: response });
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(error.response?.data?.message || "Error al obtener la lista de membresías");
    }
  };

  const handleCreateChannel = async () => {
    try {
      if (selectedUsers.length === 0) {
        setError(true);
        setErrorMessage("Debes seleccionar al menos un usuario");
        return;
      }

      const createChannel = container.get<CreateChannelUseCase>(TYPES.CreateChannelUseCase);

      const response = await createChannel.execute({
        name: channelName,
        userIds: selectedUsers.map((id) => parseInt(id)),
      });

      if (!response) {
        console.log("error");
        return;
      }

      console.log("Canal creado:", response);
      toggleModal("selectedUsersModal", false);
      dispatch({ type: "SET_SELECTED_USERS", selectedUsers: [] });
      dispatch({ type: "SET_FIELD", value: "" });
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(error.response?.data?.message || "Error al crear el canal");
    }
  };

  const handleSendMessage = () => {
    if (!textMessage.trim()) {
      setError(true);
      setErrorMessage("Debes ingresar un mensaje");
      return;
    }

    if (selectedUsers.length === 0) {
      setError(true);
      setErrorMessage("Debes seleccionar al menos un usuario");
      return;
    }

    console.log("Mensaje enviado:", {
      channel: channelName,
      message: textMessage,
      selectedUsers,
    });

    setTextMessage("");
    dispatch({ type: "SET_SELECTED_USERS", selectedUsers: [] });
    dispatch({ type: "SET_FIELD", value: "" });
  };

  const handleSetTextFilter = debounce(async (textFilter: string) => {
    dispatch({ type: "SET_TEXT_FILTER", value: textFilter });
    await getAthletesList({ textFilter }, true);
  }, 300);

  const handleUserSelection = (selected: string[]) => {
    const updatedUsers = selected
      .filter((id) => !selectedUsers.includes(id))
      .concat(selectedUsers.filter((id) => selected.includes(id)));

    dispatch({ type: "SET_SELECTED_USERS", selectedUsers: updatedUsers });
  };

  const handleEmojiClick = (event: EmojiClickData) => {
    setTextMessage((prev) => prev + event.emoji);
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
    chats,
    selectedChat,
    selectedUsers,
    isLoading,
    hasMore,
    error,
    errorMessage,
    isModalOpen,
    channelName,
    membership,
    handleSetTextFilter,
    textMessage,
    openEmojiPicker,
    setOpenEmojiPicker,
    handleTextMessage,
    setField,
    setError,
    handleChatClick,
    getAthletesList,
    handleUserSelection,
    handleCreateChannel,
    toggleModal,
    handleOpenSelectedUsersModal,
    handleSendMessage,
    handleEmojiClick,
  };
};

export default ViewModel;
