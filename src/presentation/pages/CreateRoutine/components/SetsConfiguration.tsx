"use client";

import { useState } from "react";
import { CustomButton, FormInput } from "@/presentation/components";
import DeleteIcon from "@/assets/svg/DeleteIcon";

const SetsConfiguration = () => {
  const mockSelectedExercises = [
    {
      exerciseId: 1,
      exerciseTitle: "Sentadillas",
      exerciseDescription:
        "Un ejercicio para fortalecer los músculos de las piernas y los glúteos.",
      sets: [
        { setNumber: 1, repetitions: 12, weight: 50 },
        { setNumber: 2, repetitions: 10, weight: 55 },
      ],
    },
    {
      exerciseId: 2,
      exerciseTitle: "Press de Banca",
      exerciseDescription:
        "Ejercicio enfocado en trabajar los músculos del pecho y tríceps.",
      sets: [
        { setNumber: 1, repetitions: 10, weight: 70 },
        { setNumber: 2, repetitions: 8, weight: 75 },
      ],
    },
    {
      exerciseId: 3,
      exerciseTitle: "Dominadas",
      exerciseDescription:
        "Ejercicio compuesto para trabajar espalda y bíceps.",
      sets: [
        { setNumber: 1, repetitions: 8, weight: 0 },
        { setNumber: 2, repetitions: 6, weight: 0 },
      ],
    },
  ];

  const [setsData, setSetsData] = useState(
    mockSelectedExercises.reduce((acc, exercise) => {
      acc[exercise.exerciseId] = exercise.sets;
      return acc;
    }, {} as Record<number, { setNumber: number; repetitions: number; weight: number }[]>)
  );

  const handleAddSet = (exerciseId: number) => {
    setSetsData((prev) => ({
      ...prev,
      [exerciseId]: [
        ...prev[exerciseId],
        {
          setNumber: prev[exerciseId].length + 1,
          repetitions: 0,
          weight: 0,
        },
      ],
    }));
  };

  const handleDeleteSet = (exerciseId: number, setIndex: number) => {
    setSetsData((prev) => {
      const updatedSets = prev[exerciseId].filter(
        (_, index) => index !== setIndex
      );
      return { ...prev, [exerciseId]: updatedSets };
    });
  };

  const handleSetChange = (
    exerciseId: number,
    setIndex: number,
    field: "repetitions" | "weight",
    value: number
  ) => {
    setSetsData((prev) => {
      const updatedSets = [...prev[exerciseId]];
      updatedSets[setIndex][field] = value;
      return { ...prev, [exerciseId]: updatedSets };
    });
  };

  return (
    <div className="mx-auto xl:w-11/12 space-y-6">
      <h2 className="text-xl font-semibold">Paso 3: Configuración de Sets</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(setsData).map(([exerciseId, sets]) => {
          const exercise = mockSelectedExercises.find(
            (e) => e.exerciseId === parseInt(exerciseId)
          );

          return (
            <div
              key={exerciseId}
              className="p-4 bg-[#121417] rounded-lg shadow-md max-h-72 overflow-y-auto"
            >
              <h3 className="text-lg font-semibold mb-2">
                {exercise?.exerciseTitle}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {exercise?.exerciseDescription}
              </p>

              <div className="space-y-4">
                {sets.map((set, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="font-medium">Set {index + 1}</span>
                    <FormInput
                      type="number"
                      placeholder="Repeticiones"
                      value={set.repetitions || ""}
                      onChange={(e) =>
                        handleSetChange(
                          parseInt(exerciseId),
                          index,
                          "repetitions",
                          parseInt(e, 10) || 0
                        )
                      }
                      customInputClass="w-24"
                    />
                    <FormInput
                      type="number"
                      placeholder="Peso (kg)"
                      value={set.weight || ""}
                      onChange={(e) =>
                        handleSetChange(
                          parseInt(exerciseId),
                          index,
                          "weight",
                          parseInt(e, 10) || 0
                        )
                      }
                      customInputClass="w-24"
                    />

                    <button
                      type="button"
                      className="text-red-500 font-bold text-lg hover:text-red-700"
                      onClick={() =>
                        handleDeleteSet(parseInt(exerciseId), index)
                      }
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
                    onClick={() => handleAddSet(parseInt(exerciseId))}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SetsConfiguration;
