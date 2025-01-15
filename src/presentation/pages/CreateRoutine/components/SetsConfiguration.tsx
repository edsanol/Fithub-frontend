"use client";

import { useEffect, useState } from "react";
import { CustomButton, FormInput, InfoModal } from "@/presentation/components";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { useRoutine } from "../context/RoutineContext";
import container from "@/config/inversifyContainer";
import { GetExercisesListUseCase } from "@/domain/useCases/Routine/getExercisesListUseCase";
import { TYPES } from "@/config/types";
import { Exercise } from "@/domain/entities/Exercise";

const SetsConfiguration = () => {
  const { state, dispatch } = useRoutine();

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchSelectedExercises();
  }, []);

  const fetchSelectedExercises = async () => {
    try {
      const selectedExerciseIds = state.routine.exercises.map((exercise) => exercise.idExercise).join(",");

      if (!selectedExerciseIds) {
        return;
      }

      const getExercisesListUseCase = container.get<GetExercisesListUseCase>(TYPES.GetExercisesListUseCase);

      const response = await getExercisesListUseCase.execute({
        numRecordsPage: 1000,
        textFilter: selectedExerciseIds,
        numFilter: 7,
      });

      if (response && response.items.length > 0) {
        setSelectedExercises(response.items);

        const exercisesWithSets = response.items.map((exercise) => {
          const existingExercise = state.routine.exercises.find((ex) => ex.idExercise === exercise.exerciseId);

          return (
            existingExercise || {
              idExercise: exercise.exerciseId,
              sets: [{ setNumber: 1, reps: 0, weight: 0 }],
            }
          );
        });

        dispatch({
          type: "SET_SELECTED_EXERCISES",
          selectedExercises: exercisesWithSets,
        });
      }
    } catch (error) {
      console.error("Error fetching selected exercises:", error);
      setError(true);
      setErrorMessage("Ha ocurrido un error al obtener los ejercicios seleccionados.");
    }
  };

  const handleAddSet = (idExercise: number) => {
    const updatedSets = state.routine.exercises.find((exercise) => exercise.idExercise === idExercise)?.sets || [];

    const newSet = {
      setNumber: updatedSets.length + 1,
      reps: 0,
      weight: 0,
    };

    const updatedExerciseSets = [...updatedSets, newSet];

    dispatch({
      type: "UPDATE_EXERCISE_SETS",
      idExercise,
      sets: updatedExerciseSets,
    });
  };

  const handleSetChange = (idExercise: number, setIndex: number, field: "reps" | "weight", value: number) => {
    const updatedSets = state.routine.exercises.find((exercise) => exercise.idExercise === idExercise)?.sets || [];

    updatedSets[setIndex][field] = value;

    dispatch({
      type: "UPDATE_EXERCISE_SETS",
      idExercise,
      sets: updatedSets,
    });
  };

  const handleSetRemoval = (idExercise: number, setId: number) => {
    dispatch({ type: "ADD_TO_DELETE_SETS", setId });
  
    const updatedSets = state.routine.exercises.find((exercise) => exercise.idExercise === idExercise)?.sets || [];
  
    const filteredSets = updatedSets.filter((set) => set.setId !== setId);
  
    dispatch({
      type: "UPDATE_EXERCISE_SETS",
      idExercise,
      sets: filteredSets,
    });
  };

  const handleDeleteSet = (idExercise: number, setIndex: number) => {
    const exercise = state.routine.exercises.find((exercise) => exercise.idExercise === idExercise);
  
    if (exercise && exercise.sets && setIndex >= 0 && setIndex < exercise.sets.length) {
      const setToDelete = exercise.sets[setIndex];
  
      if (setToDelete?.setId) {
        handleSetRemoval(idExercise, setToDelete.setId);
      } else {
        const filteredSets = exercise.sets.filter((_, index) => index !== setIndex);
  
        dispatch({
          type: "UPDATE_EXERCISE_SETS",
          idExercise,
          sets: filteredSets,
        });
      }
    } else {
      console.warn(`No se encontró el ejercicio con ID ${idExercise} o el índice ${setIndex} es inválido.`);
    }
  };

  return (
    <>
      <div className="mx-auto xl:w-11/12 space-y-6">
        <h2 className="text-xl font-semibold">Paso 3: Configuración de Sets</h2>

        {selectedExercises.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay ejercicios seleccionados para configurar sets.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedExercises.map((exercise) => {
              const sets = state.routine.exercises.find((ex) => ex.idExercise === exercise.exerciseId)?.sets || [];

              return (
                <div
                  key={exercise.exerciseId}
                  className="p-4 bg-[#121417] rounded-lg shadow-md max-h-72 overflow-y-auto"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {exercise.exerciseTitle}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {exercise.exerciseDescription}
                  </p>

                  <div className="space-y-4">
                    {sets.map((set, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <span className="font-medium">Set {set.setNumber}</span>
                        <FormInput
                          type="number"
                          label="Repeticiones"
                          value={set.reps === 0 ? "" : set.reps}
                          onChange={(value) => handleSetChange(exercise.exerciseId!, index, "reps", parseInt(value, 10) || 0)}
                          customInputClass="w-32"
                          size="sm"
                        />
                        <FormInput
                          type="number"
                          label="Peso (kg)"
                          value={set.weight === 0 ? "" : set.weight}
                          onChange={(e) => handleSetChange(exercise.exerciseId!, index, "weight", parseInt(e, 10) || 0)}
                          customInputClass="w-32"
                          size="sm"
                        />
                        <button
                          type="button"
                          className="text-red-500 font-bold text-lg hover:text-red-700"
                          onClick={() => handleDeleteSet(exercise.exerciseId!, index)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    ))}

                    <div className="flex items-center justify-end">
                      <CustomButton
                        type="button"
                        color="primary"
                        variant="solid"
                        text="Agregar Set"
                        onClick={() => handleAddSet(exercise.exerciseId!)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <InfoModal
        isOpen={error}
        onOpenChange={setError}
        message={errorMessage}
      />
    </>
  );
};

export default SetsConfiguration;
