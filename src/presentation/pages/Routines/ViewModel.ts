import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { Routine } from "@/domain/entities/Routine";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { GetRoutinesListUseCase } from "@/domain/useCases/Routine/getRoutinesListUseCase";
import { useRouter } from "next/navigation";
import { useReducer } from "react";

interface State {
  routinesList: PaginateResponseList<Routine>;
}

const initialState: State = {
  routinesList: {
    totalRecords: 0,
    items: [],
  },
};

type Action = 
  | { type: "SET_ROUTINES_LIST"; routinesList: PaginateResponseList<Routine> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ROUTINES_LIST":
      return {
        ...state,
        routinesList: action.routinesList,
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const router = useRouter();

  const [{ routinesList }, dispatch] = useReducer(reducer, initialState);

  const getRoutinesList = async (params: Partial<PaginateData>) => {
    try {
      const getRoutinesListUseCase = container.get<GetRoutinesListUseCase>(TYPES.GetRoutinesListUseCase);

      const response = await getRoutinesListUseCase.execute({
        numRecordsPage: 7,
        ...params,
      });

      if (!response) {
        console.log("Error al obtener la lista de rutinas");
        return;
      }

      dispatch({ type: "SET_ROUTINES_LIST", routinesList: response });
    } catch (error) {
      console.log("Error al obtener la lista de rutinas", error);
    }
  };

  const handleSetNumPage = async (numPage: number) => {
    await getRoutinesList({ numPage });
  };

  const handleSetTextFilter = async (textFilter: string) => {
    await getRoutinesList({ textFilter, numFilter: 1 });
  };

  const handleRedirect = (routineId: number) => {
    router.push(`/create-routine/${routineId}`);
  };

  const handleOpenModal = (routineId: number, modalName: "detailsModal" | "deleteModal" | "editMembershipModal") => {
    console.log(routineId, modalName);
  };

  return {
    routinesList,
    handleSetNumPage,
    handleSetTextFilter,
    handleRedirect,
    handleOpenModal,
  };
};

export default ViewModel;
