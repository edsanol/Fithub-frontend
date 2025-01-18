"use client";

import BasicInformation from "./components/BasicInformation";
import ExercisesSelection from "./components/ExercisesSelection";
import SetsConfiguration from "./components/SetsConfiguration";
import RoutineSummary from "./components/RoutineSummary";
import { CustomMultiSteps, DashboardHeader } from "@/presentation/components";
import { RoutineProvider } from "./context/RoutineContext";

const steps = [
  { title: "Información Básica", component: <BasicInformation /> },
  { title: "Selección de Ejercicios", component: <ExercisesSelection /> },
  { title: "Configuración de Sets", component: <SetsConfiguration /> },
  { title: "Resumén y Confirmación", component: <RoutineSummary /> },
];

const CreateRoutine = () => {
  return (
    <RoutineProvider>
      <DashboardHeader title="Crear Nueva Rutina" />

      <CustomMultiSteps
        steps={steps}
        initialStep={0}
      />
    </RoutineProvider>
  );
};

export default CreateRoutine;
