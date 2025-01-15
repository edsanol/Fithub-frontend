"use client";

import { RoutinesColumns } from "@/assets/constants/columns/Columns";
import { CustomModal, CustomTable, DashboardHeader, PrimaryButton } from "@/presentation/components";
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
    </>
  );
};

export default Routines;
