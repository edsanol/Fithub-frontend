"use client";

import { useEffect, useRef, useState } from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import CustomButton from "../buttons/CustomButton";

interface Step {
  title: string;
  component: JSX.Element;
}

interface CustomMultiStepProps {
  steps: Step[];
  initialStep?: number;
  onNext?: (currentStep: number) => void;
  onBack?: (currentStep: number) => void;
  onFinish?: () => void;
}

const CustomMultiSteps = ({
  steps,
  initialStep = 0,
  onNext,
  onBack,
  onFinish,
}: CustomMultiStepProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentStepElement = stepRefs.current[currentStep];
    if (currentStepElement && stepsContainerRef.current) {
      currentStepElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      onNext?.(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      onBack?.(currentStep - 1);
    }
  };

  const handleFinish = () => {
    onFinish?.();
  };

  return (
    <div className="w-full mx-auto rounded-lg shadow-lg p-2 md:p-4">

      {/* Barra de Pasos */}
      <div 
        ref={stepsContainerRef} 
        className="flex items-center justify-between gap-3 overflow-x-auto md:flex-wrap md:justify-center"
      >
        {steps.map((step, index) => (
          <div 
            key={index}
            ref={(element) => (stepRefs.current[index] = element)}
            className="flex flex-col items-center flex-shrink-0 md:flex-1"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${index === currentStep ? "bg-blue-600 text-white" : "bg-[#18181a] text-gray-300"}`}>
              {index + 1}
            </div>
            <span className={`mt-2 text-sm ${index === currentStep ? "text-blue-400" : "text-gray-400"}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Contenido Dinámico */}
      <div className="p-2 md:p-6 rounded-lg shadow-md">
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
            onClick={handleFinish}
          />
        )}
      </div>
    </div>
  );
};

export default CustomMultiSteps;
