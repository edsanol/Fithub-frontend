"use client";

import { RoutinesColumns } from "@/assets/constants/columns/Columns";
import { CustomTable, DashboardHeader, PrimaryButton } from "@/presentation/components";
import { useRouter } from "next/navigation";
import ViewModel from "./ViewModel";
import { customRenderCell } from "./components/table-render-cell/RenderCell";

const Routines = () => {
  const router = useRouter();

  const {
    routinesList,
    handleSetNumPage,
    handleSetTextFilter,
    handleRedirect,
    handleOpenModal,
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
    </>
  );
};

export default Routines;
