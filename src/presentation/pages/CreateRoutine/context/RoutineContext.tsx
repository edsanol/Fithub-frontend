"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Exercises, Routine } from "@/domain/entities/Routine";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { Exercise } from "@/domain/entities/Exercise";

interface State {
  routine: Routine;
  exercisesList: PaginateResponseList<Exercise>;
}

type Action =
  | { type: "SET_FIELD"; field: keyof Routine; value: string | number | boolean }
  | { type: "SET_EXERCISES_LIST"; exercisesList: PaginateResponseList<Exercise> }
  | { type: "SET_SELECTED_EXERCISES"; selectedExercises: Exercises[] };

interface RoutineProviderProps {
  children: ReactNode;
}

const initialState: State = {
  routine: {
    title: "",
    description: "",
    idMuscleGroup: 0,
    imageURL: "",
    exercises: [],
  },
  exercisesList: {
    totalRecords: 0,
    items: [],
  }
};

const RoutineContext = createContext<{ state: State; dispatch: React.Dispatch<Action>; } | null>(null);

export const RoutineProvider = ({ children }: RoutineProviderProps) => {
  const [state, dispatch] = useReducer(routineReducer, initialState);

  return (
    <RoutineContext.Provider value={{ state, dispatch }}>
      {children}
    </RoutineContext.Provider>
  );
};

function routineReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        routine: {
          ...state.routine,
          [action.field]: action.value,
        },
      };
    case "SET_EXERCISES_LIST":
      return {
        ...state,
        exercisesList: action.exercisesList,
      };
    case "SET_SELECTED_EXERCISES":
      return {
        ...state,
        routine: {
          ...state.routine,
          exercises: action.selectedExercises,
        },
      };
    default:
      return state;
  }
}

export const useRoutine = () => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error("useRoutine must be used within a RoutineProvider");
  }
  return context;
};
