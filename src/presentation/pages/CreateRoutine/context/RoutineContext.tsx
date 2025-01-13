"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Routine } from "@/domain/entities/Routine";

interface State {
  routine: Routine;
}

type Action = {
  type: "SET_FIELD"; field: keyof Routine; value: string | number | boolean;
};

interface RoutineProviderProps {
  children: ReactNode;
}

const initialState: State = {
  routine: {
    title: "",
    description: "",
    idMuscleGroup: 0,
    imageURL: "",
    startDate: "",
    endDate: "",
    exercises: [],
  },
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
