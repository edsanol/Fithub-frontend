"use client";

import { Button } from "@nextui-org/react";
import { useRoutine } from "../context/RoutineContext";

const RoutineSummary = () => {
  const { state } = useRoutine();

  const { title, description, idMuscleGroup, exercises } = state.routine;

  const muscleGroups = {
    1: "Pecho",
    2: "Espalda",
    3: "Bíceps",
    4: "Tríceps",
  };

  return (
    <div className="mx-auto xl:w-11/12 space-y-8 p-6 bg-[#121417] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-6">
        Resumen de la Rutina
      </h2>

      {/* Información Básica */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white border-b pb-2">
          Información General
        </h3>
        <p className="text-gray-600">
          <strong className="text-white">Nombre:</strong>{" "}
          {title || "Sin nombre"}
        </p>
        <p className="text-gray-600">
          <strong className="text-white">Descripción:</strong>{" "}
          {description || "Sin descripción"}
        </p>
        <p className="text-gray-600">
          <strong className="text-white">Grupo Muscular:</strong>{" "}
          {"No especificado"}
        </p>
      </div>

      {/* Ejercicios */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white border-b pb-2">
          Ejercicios
        </h3>
        {exercises.length > 0 ? (
          <div className="space-y-4">
            {exercises.map((exercise) => {
              const sets = exercise.sets || [];
              return (
                <div
                  key={exercise.idExercise}
                  className="p-4 rounded-lg shadow-sm"
                >
                  <h4 className="text-lg font-medium text-white">
                    Ejercicio ID: {exercise.idExercise}
                  </h4>
                  <ul className="space-y-2 mt-2">
                    {sets.map((set, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm"
                      >
                        <span className="text-gray-700">
                          <strong>Set {set.setNumber}:</strong>
                        </span>
                        <span className="text-gray-600">
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
          <p className="text-gray-600">
            No se han agregado ejercicios a esta rutina.
          </p>
        )}
      </div>

      {/* Botón de Confirmación */}
      <div className="text-center mt-6">
        <Button
          className="px-6 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
          onClick={() => console.log("Rutina guardada")}
        >
          Guardar Rutina
        </Button>
      </div>
    </div>
  );
};

export default RoutineSummary;
