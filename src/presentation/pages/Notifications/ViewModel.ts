import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { debounce } from "lodash";
import { GetMembershipByGymIdUseCase } from "@/domain/useCases/Membership/getMembershipByGymIdUseCase";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";
import { EmojiClickData } from "emoji-picker-react";
import { Channel } from "@/domain/entities/Channel";
import { GetChannelsUseCase } from "@/domain/useCases/Channel/getChannelsUseCase";
import { CreateChannelUseCase } from "@/domain/useCases/Channel/createChannelUseCase";
import { SendNotificationUseCase } from "@/domain/useCases/Message/sendNotificationUseCase";
import { GetNotificationsUseCase } from "@/domain/useCases/Message/getNotificationsUseCase";
import { GetNotifications } from "@/domain/models/getNotifications";
import { SignalRNotificationUseCase } from "@/domain/useCases/SignalR/signalRNotificationUseCase";

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
  channelsList: Channel[];
  notificationsList: GetNotifications[];
}

type Value = string | number;

type Action =
  | { type: "SET_FIELD"; value: string }
  | { type: "SET_ATHLETES_LIST"; athletesList: PaginateResponseList }
  | { type: "SET_ATHLETE_USER"; athleteUser: AthleteUser }
  | { type: "SET_SELECTED_USERS"; selectedUsers: string[] }
  | { type: "TOGGLE_MODAL"; modalName: string; value?: boolean }
  | { type: "SET_TEXT_FILTER"; value: string }
  | { type: "SET_MEMBERSHIP"; membership: MembershipByGymId[] }
  | { type: "SET_CHANNELS_LIST"; channelsList: Channel[] }
  | { type: "SET_NOTIFICATIONS_LIST"; notificationsList: GetNotifications[] }
  | { type: "APPEND_NOTIFICATION"; notification: GetNotifications };

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
  channelsList: [],
  notificationsList: [],
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
      return {
        ...state,
        isModalOpen: {
          ...state.isModalOpen,
          [action.modalName]:
            action.value ??
            !state.isModalOpen[action.modalName as keyof State["isModalOpen"]],
        },
      };
    case "SET_CHANNELS_LIST":
      return { ...state, channelsList: action.channelsList };
    case "SET_NOTIFICATIONS_LIST":
      return { ...state, notificationsList: action.notificationsList };
    case "APPEND_NOTIFICATION":
      return {
        ...state,
        notificationsList: [...state.notificationsList, action.notification],
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const [
    {
      athletesList,
      selectedUsers,
      isModalOpen,
      channelName,
      membership,
      textFilter,
      channelsList,
      notificationsList,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [textMessage, setTextMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<Channel>({
    channelId: 0,
    channelName: "",
    channelAthletes: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const selectedChatRef = useRef(selectedChat.channelId);

  const signalRNotificationUseCase = container.get<SignalRNotificationUseCase>(
    TYPES.SignalRNotificationUseCase
  );

  const initializeConnection = async () => {
    await signalRNotificationUseCase.initializeConnection();
  };

  const handleReceiveMessage = useCallback(
    (channelId: number, message: string) => {
      if (channelId === selectedChatRef.current) {
        dispatch({
          type: "APPEND_NOTIFICATION",
          notification: {
            notificationId: Math.random(),
            channelId,
            message,
            sendAt: new Date().toISOString(),
          },
        });
      }
    },
    []
  );

  useEffect(() => {
    selectedChatRef.current = selectedChat.channelId;
  }, [selectedChat.channelId]);

  useEffect(() => {
    initializeConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    signalRNotificationUseCase.subscribeToNotifications(handleReceiveMessage);

    return () => {
      signalRNotificationUseCase.unsubscribeFromNotifications();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const joinChannel = async () => {
      if (selectedChat.channelId && selectedChat.channelId > 0) {
        try {
          if (signalRNotificationUseCase) {
            await signalRNotificationUseCase.joinChannel(
              selectedChat.channelId
            );
          }
        } catch (error) {
          console.error("Error al unirse al canal:", error);
        }
      }
    };

    joinChannel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat.channelId]);

  useEffect(() => {
    getChannelsList();
  }, []);

  const handleTextMessage = (value: string) => {
    setTextMessage(value);
  };

  const handleChatClick = async (channelId: number) => {
    const channel = channelsList.find(
      (channel) => channel.channelId === channelId
    );

    if (!channel || !channel.channelAthletes) {
      setError(true);
      setErrorMessage("Error al seleccionar el chat");
      return;
    }

    const channelAthletes = channel.channelAthletes.map((athlete) =>
      athlete.athleteId.toString()
    );

    setSelectedChat(channel);
    dispatch({ type: "SET_SELECTED_USERS", selectedUsers: channelAthletes });

    await getNotificationsList(channelId);
  };

  const getAthletesList = async (
    params?: Partial<PaginateData>,
    reset = false
  ) => {
    try {
      setIsLoading(true);

      const filterByName = params?.textFilter ?? textFilter;
      const numPage = reset ? 1 : Math.ceil(athletesList.items.length / 7) + 1;

      const getAthleteUserListUseCase =
        container.get<GetAthleteUserListUseCase>(
          TYPES.GetAthleteUserListUseCase
        );

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
      setErrorMessage(
        error.response?.data?.message || "Error al obtener la lista de usuarios"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getMembershipByGymId = async () => {
    try {
      const getMembershipByGymId = container.get<GetMembershipByGymIdUseCase>(
        TYPES.GetMembershipByGymIdUseCase
      );

      const response = await getMembershipByGymId.execute();

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_MEMBERSHIP", membership: response });
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(
        error.response?.data?.message ||
          "Error al obtener la lista de membresías"
      );
    }
  };

  const getChannelsList = async () => {
    try {
      setIsLoading(true);

      const getChannelsList = container.get<GetChannelsUseCase>(
        TYPES.GetChannelsUseCase
      );

      const response = await getChannelsList.execute();

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_CHANNELS_LIST", channelsList: response });

      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(
        error.response?.data?.message || "Error al obtener la lista de canales"
      );
      setIsLoading(false);
    }
  };

  const handleCreateChannel = async () => {
    try {
      if (selectedUsers.length === 0) {
        setError(true);
        setErrorMessage("Debes seleccionar al menos un usuario");
        return;
      }

      const createChannel = container.get<CreateChannelUseCase>(
        TYPES.CreateChannelUseCase
      );

      const response = await createChannel.execute({
        name: channelName,
        userIds: selectedUsers.map((id) => parseInt(id)),
      });

      if (!response) {
        console.log("error");
        return;
      }

      console.log("Canal creado:", response);
      await getChannelsList();
      toggleModal("selectedUsersModal", false);
      dispatch({ type: "SET_SELECTED_USERS", selectedUsers: [] });
      dispatch({ type: "SET_FIELD", value: "" });
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(
        error.response?.data?.message || "Error al crear el canal"
      );
    }
  };

  const handleSendMessage = async () => {
    try {
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

      const sendNotification = container.get<SendNotificationUseCase>(
        TYPES.SendNotificationUseCase
      );

      const response = await sendNotification.execute({
        channelId: selectedChat.channelId!,
        message: textMessage,
      });

      if (!response) {
        console.log("error");
        return;
      }

      setTextMessage("");
      dispatch({ type: "SET_FIELD", value: "" });
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(
        error.response?.data?.message ||
          "Error al obtener la lista de membresías"
      );
    }
  };

  const getNotificationsList = async (id: number) => {
    try {
      const getNotifications = container.get<GetNotificationsUseCase>(
        TYPES.GetNotificationsUseCase
      );

      const response = await getNotifications.execute(id);

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_NOTIFICATIONS_LIST", notificationsList: response });
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(
        error.response?.data?.message ||
          "Error al obtener la lista de notificaciones"
      );
    }
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

  const toggleModal = async (modalName: string, value?: boolean) => {
    if (modalName === "selectedUsersModal" && value) {
      await getAthletesList({ textFilter: "" }, true);
      await getMembershipByGymId();
    }

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

  const handleTruncateText = (text: string, length: number) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  return {
    athletesList,
    channelsList,
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
    notificationsList,
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
    handleTruncateText,
  };
};

export default ViewModel;
