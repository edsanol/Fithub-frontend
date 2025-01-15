"use client";

import { RoutinesColumns } from "@/assets/constants/columns/Columns";
import {
  CustomModal,
  CustomTable,
  DashboardHeader,
  PrimaryButton,
} from "@/presentation/components";
import { useRouter } from "next/navigation";
import ViewModel from "./ViewModel";
import { customRenderCell } from "./components/table-render-cell/RenderCell";
import WarningIcon from "@/assets/svg/WarningIcon";
import { Button } from "@nextui-org/react";

const Routines = () => {
  const router = useRouter();

  const {
    routine,
    routinesList,
    isModalOpen,
    handleSetNumPage,
    handleSetTextFilter,
    handleRedirect,
    handleOpenModal,
    toggleModal,
    desactivateRoutine,
  } = ViewModel();

  return (
    <>
      <DashboardHeader
        title="Gestiona tus Rutinas"
        description="Explora la lista completa de tus rutinas y encuéntralas rápidamente usando el filtro por nombre. Visualiza todos sus detalles y, si es necesario, elimina rutinas de manera sencilla."
        customClassName="mb-5"
      />

      <div className="flex justify-center mt-3 md:justify-end">
        <PrimaryButton
          text="Crear Rutina"
          btnType="button"
          customButtonClass="w-64 p-8"
          onClick={() => router.push("/create-routine")}
        />
      </div>

      <CustomTable
        onSetNumPage={handleSetNumPage}
        onSetTextFilter={handleSetTextFilter}
        customRenderCell={(routine, columnKey) => customRenderCell(routine, columnKey, { handleOpenModal, handleRedirect })}
        records={routinesList}
        columns={RoutinesColumns}
        uniqueKeyField="routineId"
      />

      <CustomModal
        isOpen={isModalOpen.deleteModal}
        onOpenChange={() => toggleModal("deleteModal")}
        size="2xl"
        content={
          <>
            <div className="mt-3 flex flex-col justify-center">
              <div className="mx-auto">
                <WarningIcon />
              </div>
              <p className="text-lg text-center mt-5">
                ¿Estás seguro de desactivar esta rutina?
              </p>
              <p className="text-sm text-center text-default-400">
                Esta acción no se puede deshacer.
              </p>
            </div>
          </>
        }
        footerContent={
          <>
            <Button
              color="primary"
              variant="ghost"
              onPress={() => toggleModal("deleteModal")}
            >
              Cerrar
            </Button>
            <Button
              color="danger"
              onPress={() => {
                if (routine) {
                  desactivateRoutine(routine.routineId!);
                  toggleModal("deleteModal");
                }
              }}
            >
              Si, eliminar
            </Button>
          </>
        }
      />

      <CustomModal
        isOpen={isModalOpen.detailsModal}
        onOpenChange={() => toggleModal("detailsModal")}
        size="2xl"
        content={
          <>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Detalles de la Rutina
              </h2>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2">
                    Información General
                  </h3>
                  <p className="text-gray-400">
                    <strong className="text-white">Nombre:</strong>{" "}
                    {routine?.title || "Sin nombre"}
                  </p>
                  <p className="text-gray-400">
                    <strong className="text-white">Descripción:</strong>{" "}
                    {routine?.description || "Sin descripción"}
                  </p>
                  <p className="text-gray-400">
                    <strong className="text-white">Grupo Muscular:</strong>{" "}
                    {routine?.muscleGroupName || "Sin grupo muscular"}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2">
                    Ejercicios
                  </h3>
                  {routine?.exercises?.length > 0 ? (
                    <div className="space-y-6">
                      {routine.exercises.map((exercise) => (
                        <div
                          key={exercise.idExercise}
                          className="p-4 bg-[#24292e] rounded-lg shadow-md"
                        >
                          <h4 className="text-lg font-medium text-white">
                            Ejercicio ID: {exercise.exerciseTitle}
                          </h4>
                          <ul className="space-y-2 mt-3">
                            {exercise.sets?.map((set, index) => (
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
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      No se han agregado ejercicios a esta rutina.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        }
        footerContent={
          <>
            <Button
              color="primary"
              variant="ghost"
              onPress={() => toggleModal("detailsModal")}
            >
              Cerrar
            </Button>
          </>
        }
      />
    </>
  );
};

export default Routines;
