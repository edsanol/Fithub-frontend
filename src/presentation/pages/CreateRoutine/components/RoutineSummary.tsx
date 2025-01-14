"use client";

import { PrimaryButton } from "@/presentation/components";
import { useRoutine } from "../context/RoutineContext";
import { useEffect } from "react";

const RoutineSummary = () => {
  const { state } = useRoutine();

  const { title, description, idMuscleGroup, exercises } = state.routine;

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <div className="mx-auto xl:w-11/12 space-y-8 p-6 bg-[#1a1d21] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Resumen de la Rutina
      </h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2">
          Información General
        </h3>
        <p className="text-gray-400">
          <strong className="text-white">Nombre:</strong> {title || "Sin nombre"}
        </p>
        <p className="text-gray-400">
          <strong className="text-white">Descripción:</strong> {description || "Sin descripción"}
        </p>
        <p className="text-gray-400">
          <strong className="text-white">Grupo Muscular:</strong> {"No especificado"}
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
                          <strong className="text-gray-300">Set {set.setNumber}:</strong>
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
        />
      </div>
    </div>
  );
};

export default RoutineSummary;