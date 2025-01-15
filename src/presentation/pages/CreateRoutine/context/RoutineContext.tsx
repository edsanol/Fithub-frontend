"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Exercises, Routine } from "@/domain/entities/Routine";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { Exercise } from "@/domain/entities/Exercise";

interface State {
  routine: Routine;
  exercise: Exercise;
  exercisesList: PaginateResponseList<Exercise>;
  muscleGroups: { label: string; value: string }[];
}

type Action =
  | { type: "SET_FIELD"; field: keyof Routine; value: string | number | boolean }
  | { type: "SET_FIELD_EXERCISE"; field: keyof Exercise; value: string | number | boolean }
  | { type: "SET_EXERCISES_LIST"; exercisesList: PaginateResponseList<Exercise> }
  | { type: "SET_SELECTED_EXERCISES"; selectedExercises: Exercises[] }
  | { type: "UPDATE_EXERCISE_SETS"; idExercise: number; sets: { setNumber: number; reps: number; weight: number }[]; }
  | { type: "SET_MUSCLE_GROUPS"; muscleGroups: { label: string; value: string }[] }
  | { type: "RESET_STATE" }
  | { type: "SET_ROUTINE"; routine: Routine };

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
  exercise: {
    title: "",
    description: "",
    duration: 0,
    idMuscleGroup: 0,
    imageURL: "",
    videoURL: "",
  },
  exercisesList: {
    totalRecords: 0,
    items: [],
  },
  muscleGroups: [],
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
    case "SET_FIELD_EXERCISE":
      return {
        ...state,
        exercise: {
          ...state.exercise,
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
    case "UPDATE_EXERCISE_SETS":
      return {
        ...state,
        routine: {
          ...state.routine,
          exercises: state.routine.exercises.map((exercise) =>
            exercise.idExercise === action.idExercise
              ? { ...exercise, sets: action.sets }
              : exercise
          ),
        },
      };
    case "SET_MUSCLE_GROUPS":
      return {
        ...state,
        muscleGroups: action.muscleGroups,
      };
    case "RESET_STATE":
      return initialState;
    case "SET_ROUTINE":
      return {
        ...state,
        routine: action.routine,
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
