import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { Routine } from "@/domain/entities/Routine";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { DesactivateRoutineUseCase } from "@/domain/useCases/Routine/desactivateRoutineUseCase";
import { GetRoutineByIdUseCase } from "@/domain/useCases/Routine/getRoutineByIdUseCase";
import { GetRoutinesListUseCase } from "@/domain/useCases/Routine/getRoutinesListUseCase";
import { useRouter } from "next/navigation";
import { useReducer } from "react";

interface State {
  routinesList: PaginateResponseList<Routine>;
  routine: Routine;
  isModalOpen: { detailsModal: boolean; deleteModal: boolean; };
}

const initialState: State = {
  routinesList: {
    totalRecords: 0,
    items: [],
  },
  isModalOpen: {
    detailsModal: false,
    deleteModal: false,
  },
  routine: {
    title: "",
    description: "",
    idMuscleGroup: 0,
    imageURL: "",
    exercises: [],
  },
};

type Action = 
  | { type: "SET_ROUTINES_LIST"; routinesList: PaginateResponseList<Routine> }
  | { type: "SET_ROUTINE"; routine: Routine }
  | { type: "TOGGLE_MODAL"; modalName: string; value?: boolean }
  | { type: "CLOSE_MODAL" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ROUTINES_LIST":
      return {
        ...state,
        routinesList: action.routinesList,
      };
    case "SET_ROUTINE":
      return {
        ...state,
        routine: action.routine,
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: { ...state.isModalOpen, [action.modalName]: action.value ?? !state.isModalOpen[action.modalName as keyof State["isModalOpen"]] },
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: { ...state.isModalOpen, detailsModal: false, deleteModal: false, },
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const router = useRouter();

  const [{ routinesList, isModalOpen, routine }, dispatch] = useReducer(reducer, initialState);

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

  const desactivateRoutine = async (routineId: number) => {
    try {
      const desactivateRoutineUseCase = container.get<DesactivateRoutineUseCase>(TYPES.DesactivateRoutineUseCase);

      const response = await desactivateRoutineUseCase.execute(routineId);

      if (!response) {
        console.log("Error al desactivar la rutina");
        return;
      }

      await getRoutinesList({ numPage: 1 });
      dispatch({ type: "CLOSE_MODAL" });
    } catch (error) {
      console.log("Error al desactivar la rutina", error);
    }
  };

  const getRoutineById = async (id: number) => {
    try {
      const getRoutineByIdUseCase = container.get<GetRoutineByIdUseCase>(TYPES.GetRoutineByIdUseCase);

      const response = await getRoutineByIdUseCase.execute(id);

      if (!response) {
        console.log("Error al obtener la rutina");
        return;
      }

      const transformedResponse = transformRoutineResponse(response);

      dispatch({ type: "SET_ROUTINE", routine: transformedResponse });
    } catch (error) {
      console.log("Error al obtener la rutina", error);
    }
  };

  const transformRoutineResponse = (response: any): Routine => {
    const transformedExercises = response.exercises.map((exercise: any) => ({
      idExercise: exercise.idExercise,
      sets: exercise.routineExerciseSets.map((set: any) => ({
        setNumber: set.setNumber,
        reps: set.reps,
        weight: set.weight,
      })),
    }));
  
    return {
      routineId: response.routineId,
      title: response.title,
      description: response.description,
      idMuscleGroup: response.idMuscleGroup,
      muscleGroupName: response.muscleGroupName,
      imageURL: response.imageURL,
      isActive: response.isActive,
      exercises: transformedExercises,
    };
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
    getRoutineById(routineId);
    toggleModal(modalName);
  };

  const toggleModal = (modalName: string, value?: boolean) => {
    dispatch({ type: "TOGGLE_MODAL", modalName, value });
  };

  return {
    routine,
    routinesList,
    isModalOpen,
    handleSetNumPage,
    handleSetTextFilter,
    handleRedirect,
    handleOpenModal,
    toggleModal,
    desactivateRoutine,
  };
};

export default ViewModel;
