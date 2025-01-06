/* eslint-disable react-hooks/exhaustive-deps */
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
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
import { AddOrRemoveUsersFromChannelUseCase } from "@/domain/useCases/Channel/addOrRemoveUserUseCase";
import { CreateChannel } from "@/domain/models/CreateChannel";

interface State {
  athletesList: PaginateResponseList;
  athleteUser: AthleteUser;
  selectedUsers: string[];
  channelName: string;
  membership: MembershipByGymId[];
  isModalOpen: {
    selectUsersModal: boolean;
    channelNameModal: boolean;
    addAndDeleteUsersModal: boolean;
  };
  textFilter: string;
  channelsList: Channel[];
  notificationsList: GetNotifications[];
  selectedMemberships: string[];
  numFilter: number | undefined;
  deselectedUsersIds: number[];
}

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
  | { type: "APPEND_NOTIFICATION"; notification: GetNotifications }
  | { type: "SET_SELECTED_MEMBERSHIPS"; selectedMemberships: string[] }
  | { type: "SET_NUM_FILTER"; numFilter: number | undefined }
  | { type: "SET_DESELECTED_USERS"; deselectedUsersIds: number[] };

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
    selectUsersModal: false,
    channelNameModal: false,
    addAndDeleteUsersModal: false,
  },
  textFilter: "",
  channelsList: [],
  notificationsList: [],
  selectedMemberships: [],
  numFilter: 0,
  deselectedUsersIds: [],
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
    case "SET_SELECTED_MEMBERSHIPS":
      return { ...state, selectedMemberships: action.selectedMemberships };
    case "SET_NUM_FILTER":
      return { ...state, numFilter: action.numFilter };
    case "SET_DESELECTED_USERS":
      return { ...state, deselectedUsersIds: action.deselectedUsersIds };
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
      selectedMemberships,
      numFilter,
      deselectedUsersIds,
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
  const [selectAllChecked, setSelectAllChecked] = useState(false);
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
  }, []);

  useEffect(() => {
    signalRNotificationUseCase.subscribeToNotifications(handleReceiveMessage);

    return () => {
      signalRNotificationUseCase.unsubscribeFromNotifications();
    };
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
  }, [selectedChat.channelId]);

  useEffect(() => {
    getChannelsList();
  }, []);

  useEffect(() => {
    if (selectedChat.channelId) {
      updateChannelAthletesList();
    }
  }, [channelsList, selectedChat.channelId]);

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
      const filterByMemberships = selectedMemberships.join(",");
      const effectiveNumFilter = params?.numFilter ?? numFilter;
      const numPage = reset ? 1 : Math.ceil(athletesList.items.length / 7) + 1;

      const getAthleteUserListUseCase =
        container.get<GetAthleteUserListUseCase>(
          TYPES.GetAthleteUserListUseCase
        );

      const requestParams = {
        numRecordsPage: 7,
        numPage,
        textFilter: filterByMemberships || filterByName,
        numFilter: effectiveNumFilter,
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
      const getChannelsList = container.get<GetChannelsUseCase>(
        TYPES.GetChannelsUseCase
      );

      const response = await getChannelsList.execute();

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_CHANNELS_LIST", channelsList: response });
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage(
        error.response?.data?.message || "Error al obtener la lista de canales"
      );
    }
  };

  const handleCreateChannel = async () => {
    try {
      let payload = new CreateChannel({
        name: channelName,
        userIds: [],
        allUsersSelected: false,
        deselectedUserIds: [],
        allUsersSelectedByMembersip: false,
        membershipIds: [],
      });

      if (selectedMemberships.length > 0) {
        payload.allUsersSelectedByMembersip = true;
        payload.membershipIds = selectedMemberships.map(Number);
        payload.deselectedUserIds = athletesList.items
          .filter((user) => !selectedUsers.includes(user.athleteId.toString()))
          .map((user) => user.athleteId);
      } else if (selectAllChecked) {
        payload.allUsersSelected = true;
        payload.deselectedUserIds = athletesList.items
          .filter((user) => !selectedUsers.includes(user.athleteId.toString()))
          .map((user) => user.athleteId);
      } else {
        payload.userIds = selectedUsers.map(Number);
      }

      const createChannelUseCase = container.get<CreateChannelUseCase>(
        TYPES.CreateChannelUseCase
      );
      const response = await createChannelUseCase.execute(payload);

      if (!response) {
        throw new Error("Error al crear el canal");
      }

      toggleUserModal("selectUsers", false);
      dispatch({ type: "SET_SELECTED_USERS", selectedUsers: [] });
      dispatch({ type: "SET_FIELD", value: "" });

      await getChannelsList();
    } catch (error: any) {
      console.error(error);
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
        type: "message",
        title: "Nuevo mensaje",
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
    dispatch({ type: "SET_NUM_FILTER", numFilter: 7 });
    dispatch({ type: "SET_SELECTED_MEMBERSHIPS", selectedMemberships: [] });
    await getAthletesList({ textFilter, numFilter: 7 }, true);
  }, 300);

  const handleMembershipFilter = async (memberships: number[]) => {
    const membershipFilter = memberships.join(",");
    dispatch({
      type: "SET_SELECTED_MEMBERSHIPS",
      selectedMemberships: memberships.map((m) => m.toString()),
    });
    dispatch({ type: "SET_NUM_FILTER", numFilter: 6 });
    dispatch({ type: "SET_TEXT_FILTER", value: "" });
    await getAthletesList({ textFilter: membershipFilter, numFilter: 6 }, true);
  };

  const handleUserSelection = (selected: string[]) => {
    const newDeselectedUsers = athletesList.items
      .filter((user) => !selected.includes(user.athleteId.toString()))
      .map((user) => user.athleteId.toString());

    dispatch({ type: "SET_SELECTED_USERS", selectedUsers: selected });
    dispatch({
      type: "SET_DESELECTED_USERS",
      deselectedUsersIds: newDeselectedUsers,
    });
  };

  const handleEmojiClick = (event: EmojiClickData) => {
    setTextMessage((prev) => prev + event.emoji);
  };

  const toggleUserModal = async (
    type: "selectUsers" | "addAndDeleteUsers" | "channelName",
    value: boolean
  ) => {
    if (value) {
      setSelectAllChecked(false);

      dispatch({ type: "SET_TEXT_FILTER", value: "" });
      dispatch({ type: "SET_SELECTED_MEMBERSHIPS", selectedMemberships: [] });
      dispatch({ type: "SET_NUM_FILTER", numFilter: undefined });

      await Promise.all([
        getAthletesList({ textFilter: "" }, true),
        getMembershipByGymId(),
      ]);

      if (type === "selectUsers") {
        dispatch({ type: "SET_SELECTED_USERS", selectedUsers: [] });
        dispatch({ type: "SET_DESELECTED_USERS", deselectedUsersIds: [] });
      } else if (type === "addAndDeleteUsers") {
        const channelAthletes =
          selectedChat.channelAthletes?.map((a) => a.athleteId.toString()) ||
          [];
        dispatch({
          type: "SET_SELECTED_USERS",
          selectedUsers: channelAthletes,
        });
      }
    }

    dispatch({
      type: "TOGGLE_MODAL",
      modalName: `${type}Modal`,
      value,
    });
  };

  const handleSelectedUsers = async () => {
    try {
      let payload = new CreateChannel({
        channelId: selectedChat.channelId!,
        userIds: [],
        allUsersSelected: false,
        deselectedUserIds: [],
        allUsersSelectedByMembersip: false,
        membershipIds: [],
      });

      if (selectedMemberships.length > 0) {
        payload.allUsersSelectedByMembersip = true;
        payload.membershipIds = selectedMemberships.map(Number);
        payload.deselectedUserIds = athletesList.items
          .filter((user) => !selectedUsers.includes(user.athleteId.toString()))
          .map((user) => user.athleteId);
      } else if (selectAllChecked) {
        payload.allUsersSelected = true;
        payload.deselectedUserIds = athletesList.items
          .filter((user) => !selectedUsers.includes(user.athleteId.toString()))
          .map((user) => user.athleteId);
      } else {
        payload.userIds = selectedUsers.map(Number);
      }

      const addOrRemoveUsersUseCase =
        container.get<AddOrRemoveUsersFromChannelUseCase>(
          TYPES.AddOrRemoveUsersFromChannelUseCase
        );
      const response = await addOrRemoveUsersUseCase.execute(payload);

      if (!response) {
        throw new Error("Error al actualizar los usuarios");
      }

      toggleUserModal("addAndDeleteUsers", false);

      await getChannelsList();
    } catch (error: any) {
      console.error(error);
      setError(true);
      setErrorMessage(
        error.response?.data?.message || "Error al actualizar los usuarios"
      );
    }
  };

  const updateChannelAthletesList = () => {
    const updatedChannel = channelsList.find(
      (channel) => channel.channelId === selectedChat.channelId
    );

    if (!updatedChannel || !updatedChannel.channelAthletes) {
      setError(true);
      setErrorMessage("Error al sincronizar los usuarios del canal");
      return;
    }

    setSelectedChat(updatedChannel);
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

    toggleUserModal("selectUsers", true);
    toggleUserModal("channelName", false);
  };

  const handleTruncateText = (text: string, length: number) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  const handleSelectAllUsers = (selectAll: boolean) => {
    setSelectAllChecked(selectAll);

    if (selectAll) {
      const allVisibleUserIds = athletesList.items.map((user) =>
        user.athleteId.toString()
      );
      dispatch({
        type: "SET_SELECTED_USERS",
        selectedUsers: allVisibleUserIds,
      });
      dispatch({ type: "SET_DESELECTED_USERS", deselectedUsersIds: [] });
    } else {
      dispatch({ type: "SET_SELECTED_USERS", selectedUsers: [] });
      dispatch({ type: "SET_DESELECTED_USERS", deselectedUsersIds: [] });
    }
  };

  const visibleUserIds = useMemo(
    () =>
      athletesList.items
        .filter(
          (user) => !deselectedUsersIds.includes(user.athleteId.toString())
        )
        .map((user) => user.athleteId.toString()),
    [athletesList, deselectedUsersIds]
  );

  const handleScroll = debounce(async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (
      target.scrollTop + target.clientHeight >= target.scrollHeight - 10 &&
      !isLoading &&
      hasMore
    ) {
      await getAthletesList();
    }

    if (selectAllChecked) {
      dispatch({ type: "SET_SELECTED_USERS", selectedUsers: visibleUserIds });
    }
  }, 200);

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
    selectedMemberships,
    setOpenEmojiPicker,
    handleTextMessage,
    setField,
    setError,
    handleChatClick,
    getAthletesList,
    handleUserSelection,
    handleCreateChannel,
    toggleUserModal,
    handleOpenSelectedUsersModal,
    handleSendMessage,
    handleEmojiClick,
    handleTruncateText,
    handleSelectedUsers,
    handleMembershipFilter,
    handleSelectAllUsers,
    handleScroll,
  };
};

export default ViewModel;
