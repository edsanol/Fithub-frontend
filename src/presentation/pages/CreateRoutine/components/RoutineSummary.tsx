"use client";

import { InfoModal, PrimaryButton } from "@/presentation/components";
import { useRoutine } from "../context/RoutineContext";
import { useState } from "react";
import { IRoutineValidation } from "@/presentation/interfaces";
import container from "@/config/inversifyContainer";
import { CreateRoutineUseCase } from "@/domain/useCases/Routine/createRoutineUseCase";
import { TYPES } from "@/config/types";
import { usePathname, useRouter } from "next/navigation";
import { UpdateRoutineUseCase } from "@/domain/useCases/Routine/updateRoutineUseCase";

const RoutineSummary = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const routineId = pathname.match(/\/create-routine\/(.*)/);
  const routineIdValue = routineId ? routineId[1] : null;

  const { state, dispatch } = useRoutine();

  const { title, description, idMuscleGroup, exercises, imageURL } = state.routine;

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleIsValidForm = () => {
    const errors: IRoutineValidation = {
      titleError: title === "",
      descriptionError: description === "",
      imageURLError: imageURL === "",
      idMuscleGroupError: idMuscleGroup === 0,
      exercisesError: exercises.length === 0,
      setsError: exercises.some((exercise) => exercise.sets?.length === 0),
    };

    return errors;
  };

  const createRoutine = async () => {
    try {
      const errors = handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        setError(true);
        setErrorMessage(`Los siguientes campos son requeridos: ${Object.keys(errors).filter((key) => errors[key as keyof IRoutineValidation]).join(", ")}`);
        return;
      }

      let response;

      if (routineIdValue) {
        const updateRoutineUseCase = container.get<UpdateRoutineUseCase>(TYPES.UpdateRoutineUseCase);

        response = await updateRoutineUseCase.execute({
          ...state.routine,
          deleteExercises: state.deleteExercises,
          deleteSets: state.deleteSets,
        });
      } else {
        const createRoutineUseCase = container.get<CreateRoutineUseCase>(TYPES.CreateRoutineUseCase);

        response = await createRoutineUseCase.execute(state.routine);
      }

      if (!response) {
        setError(true);
        setErrorMessage("Ocurrió un error al guardar la rutina.");
      }

      dispatch({ type: "RESET_STATE" });
      router.push("/routines");
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage("Ocurrió un error al guardar la rutina.");
    }
  };

  return (
    <>
      <div className="mx-auto xl:w-11/12 space-y-8 p-6 bg-[#1a1d21] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Resumen de la Rutina
        </h2>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2">
            Información General
          </h3>
          <p className="text-gray-400">
            <strong className="text-white">Nombre:</strong>{" "}
            {title || "Sin nombre"}
          </p>
          <p className="text-gray-400">
            <strong className="text-white">Descripción:</strong>{" "}
            {description || "Sin descripción"}
          </p>
          <p className="text-gray-400">
            <strong className="text-white">Grupo Muscular:</strong>{" "}
            {state.muscleGroups.find((muscle) => Number(muscle.value) === idMuscleGroup)?.label || "Sin grupo muscular"}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2">
            Ejercicios
          </h3>
          {exercises.length > 0 ? (
            <div className="space-y-6">
              {exercises.map((exercise) => {
                const sets = exercise.sets || [];
                return (
                  <div
                    key={exercise.idExercise}
                    className="p-4 bg-[#24292e] rounded-lg shadow-md"
                  >
                    <h4 className="text-lg font-medium text-white">
                      Ejercicio ID: {exercise.idExercise}
                    </h4>
                    <ul className="space-y-2 mt-3">
                      {sets.map((set, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center p-2 bg-[#2e343b] rounded-md shadow-sm"
                        >
                          <span className="text-gray-400">
                            <strong className="text-gray-300">
                              Set {set.setNumber}:
                            </strong>
                          </span>
                          <span className="text-gray-400">
                            {set.reps} repeticiones, {set.weight} kg
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">
              No se han agregado ejercicios a esta rutina.
            </p>
          )}
        </div>

        <div className="text-center mt-6">
          <PrimaryButton
            text="Guardar Rutina"
            btnType="button"
            customButtonClass="w-full p-8"
            onClick={createRoutine}
          />
        </div>
      </div>

      <InfoModal
        isOpen={error}
        onOpenChange={setError}
        message={errorMessage}
      />
    </>
  );
};

export default RoutineSummary;
