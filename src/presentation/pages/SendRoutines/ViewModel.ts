import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { Channel } from "@/domain/entities/Channel";
import { Routine } from "@/domain/entities/Routine";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { GetChannelsUseCase } from "@/domain/useCases/Channel/getChannelsUseCase";
import { GetRoutinesListUseCase } from "@/domain/useCases/Routine/getRoutinesListUseCase";
import { SendRoutineUseCase } from "@/domain/useCases/Routine/sendRoutineUseCase";
import { useDateGMT5 } from "@/hooks/useDateGMT5";
import { debounce } from "lodash";
import { useEffect, useReducer, useRef, useState } from "react";

interface State {
  routinesList: PaginateResponseList<Routine>;
  channelsList: PaginateResponseList;
  dates: { startDate: string; endDate: string };
}

type Action =
  | { type: "SET_CHANNELS_LIST"; channelsList: PaginateResponseList }
  | { type: "SET_ROUTINES_LIST"; routinesList: PaginateResponseList<Routine> }
  | { type: "SET_DATES"; field: keyof { startDate: string; endDate: string }; value: string };

const initialState: State = {
  channelsList: {
    totalRecords: 0,
    items: [],
  },
  routinesList: {
    totalRecords: 0,
    items: [],
  },
  dates: {
    startDate: "",
    endDate: "",
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_CHANNELS_LIST":
      return { ...state, channelsList: action.channelsList };
    case "SET_ROUTINES_LIST":
      return {
        ...state,
        routinesList: action.routinesList,
      };
    case "SET_DATES":
      return {
        ...state,
        dates: { ...state.dates, [action.field]: action.value },
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const dateGMT5 = useDateGMT5();

  const [{ channelsList, routinesList, dates }, dispatch] = useReducer(reducer, initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [textChannelFilter, setTextChannelFilter] = useState("");
  const [textRoutineFilter, setTextRoutineFilter] = useState("");
  const [selectedRoutine, setSelectedRoutine] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<Channel>({
    channelId: 0,
    channelName: "",
    channelAthletes: [],
  });

  const selectedChatRef = useRef(selectedChat.channelId);

  useEffect(() => {
    selectedChatRef.current = selectedChat.channelId;
  }, [selectedChat.channelId]);

  useEffect(() => {
    getChannelsList({ textFilter: "" }, true);
  }, []);

  useEffect(() => {
    getRoutinesList({ textFilter: "" }, true);
  }, []);

  useEffect(() => {
    if (openModal) {
      setDateByDefault();
    }
  }, [openModal]);

  const handleChatClick = async (channelId: number) => {
    const channel: Channel = channelsList.items.find((channel) => channel.channelId === channelId);

    if (!channel || !channel.channelAthletes) {
      return;
    }

    setSelectedChat(channel);
  };

  const handleRoutineClick = (selected: string[]) => {
    setSelectedRoutine(selected);
  };

  const handleTruncateText = (text: string, length: number) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  const getChannelsList = async (params?: Partial<PaginateData>, reset = false) => {
    try {
      setIsLoading(true);

      const filterByName = params?.textFilter;
      const effectiveNumFilter = params?.numFilter;
      const numPage = reset ? 1 : Math.ceil(channelsList.items.length / 7) + 1;

      const requestParams = {
        numRecordsPage: 7,
        numPage,
        textFilter: filterByName,
        numFilter: effectiveNumFilter,
        ...params,
      };

      const getChannelsList = container.get<GetChannelsUseCase>(TYPES.GetChannelsUseCase);

      const response = await getChannelsList.execute(requestParams);

      if (!response || response.items.length === 0) {
        setHasMore(false);
        return;
      }

      const updatedItems = reset
        ? response.items
        : [...channelsList.items, ...response.items];

      dispatch({
        type: "SET_CHANNELS_LIST",
        channelsList: {
          totalRecords: response.totalRecords,
          items: updatedItems,
        },
      });

      if (reset) {
        setHasMore(true);
      }
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage("Error al obtener la lista de chats");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoutinesList = async (params: Partial<PaginateData>, reset = false) => {
    try {
      setIsLoading(true);

      const filterByName = params?.textFilter;
      const effectiveNumFilter = params?.numFilter;
      const numPage = reset ? 1 : Math.ceil(routinesList.items.length / 7) + 1;

      const requestParams = {
        numRecordsPage: 7,
        numPage,
        textFilter: filterByName,
        numFilter: effectiveNumFilter,
        ...params,
      };

      const getRoutinesListUseCase = container.get<GetRoutinesListUseCase>(TYPES.GetRoutinesListUseCase);

      const response = await getRoutinesListUseCase.execute(requestParams);

      if (!response || response.items.length === 0) {
        setHasMore(false);
        return;
      }

      const updatedItems = reset
        ? response.items
        : [...routinesList.items, ...response.items];

      dispatch({
        type: "SET_ROUTINES_LIST",
        routinesList: {
          totalRecords: response.totalRecords,
          items: updatedItems,
        },
      });

      if (reset) {
        setHasMore(true);
      }
    } catch (error) {
      console.log("Error al obtener la lista de rutinas", error);
      setError(true);
      setErrorMessage("Error al obtener la lista de rutinas");
    } finally {
      setIsLoading(false);
    }
  };

  const sendRoutines = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const routineId = Number(selectedRoutine.join(""));

      const sendRoutineUseCase = container.get<SendRoutineUseCase>(TYPES.SendRoutineUseCase);

      const response = await sendRoutineUseCase.execute({
        channelId: selectedChat.channelId!,
        routineId,
        startDate: dates.startDate,
        endDate: dates.endDate,
      });

      if (!response) {
        return;
      }

      setOpenModal(false);
      setError(true);
      setErrorMessage("Rutina enviada correctamente");
      setSelectedRoutine([]);
    } catch (error) {
      console.log("Error al enviar la rutina", error);
      setError(true);
      setErrorMessage("Error al enviar la rutina");
    }
  };

  const handleChannelsTextFilter = debounce(async (textFilter: string) => {
    setTextChannelFilter(textFilter);

    await getChannelsList({ textFilter, numFilter: 1 }, true);
  }, 300);

  const handleRoutinesTextFilter = debounce(async (textFilter: string) => {
    setTextRoutineFilter(textFilter);

    await getRoutinesList({ textFilter, numFilter: 1 }, true);
  }, 300);

  const handleChannelsScroll = debounce(async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50 && !isLoading && hasMore) {
      await getChannelsList({ textFilter: textChannelFilter, numFilter: 1 });
    }
  }, 200);

  const handleRoutinesScroll = debounce(async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50 && !isLoading && hasMore) {
      await getRoutinesList({ textFilter: textRoutineFilter, numFilter: 1 });
    }
  }, 200);

  const toogleModal = () => {
    setOpenModal(!openModal);
  };

  const setField = (field: keyof { startDate: string; endDate: string }, value: string) => {
    dispatch({ type: "SET_DATES", field, value });
  };

  const setDateByDefault = () => {
    dispatch({ type: "SET_DATES", field: "startDate", value: dateGMT5 });
  };

  return {
    channelsList,
    selectedChat,
    isLoading,
    handleChannelsScroll,
    handleChannelsTextFilter,
    handleRoutinesTextFilter,
    handleRoutinesScroll,
    routinesList,
    openModal,
    dates,
    error,
    errorMessage,
    setError,
    sendRoutines,
    setField,
    toogleModal,
    handleChatClick,
    handleRoutineClick,
    handleTruncateText,
  };
};

export default ViewModel;
