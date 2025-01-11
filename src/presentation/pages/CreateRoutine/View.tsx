"use client";

import { useState } from "react";
import BasicInformation from "./components/BasicInformation";
import ExercisesSelection from "./components/ExercisesSelection";
import SetsConfiguration from "./components/SetsConfiguration";
import RoutineSummary from "./components/RoutineSummary";
import {
  CustomButton,
  DashboardHeader,
  SecondaryButton,
} from "@/presentation/components";

const steps = [
  { title: "Información Básica", component: <BasicInformation /> },
  { title: "Selección de Ejercicios", component: <ExercisesSelection /> },
  { title: "Configuración de Sets", component: <SetsConfiguration /> },
  { title: "Resumén y Confirmación", component: <RoutineSummary /> },
];

const CreateRoutine = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinishRoutine = () => {
    console.log("¡Rutina creada exitosamente!");
  };

  return (
    <>
      <DashboardHeader title="Crear Nueva Rutina" customClassName="mb-5" />

      <div className="w-full mx-auto rounded-lg shadow-lg p-6">
        {/* Barra de Pasos */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
                  index === currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-[#18181a] text-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-sm ${
                  index === currentStep ? "text-blue-400" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Contenido Dinámico */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          {steps[currentStep].component}
        </div>

        {/* Navegación */}
        <div className="flex justify-between mt-6">
          <SecondaryButton
            isDisabled={currentStep === 0}
            onClick={handleBack}
            text="Anterior"
          />

          {currentStep < steps.length - 1 ? (
            <CustomButton
              type="button"
              color="primary"
              variant="ghost"
              text="Siguiente"
              onClick={handleNext}
            />
          ) : (
            <CustomButton
              type="button"
              color="primary"
              variant="shadow"
              text="Finalizar"
              onClick={handleFinishRoutine}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateRoutine;
