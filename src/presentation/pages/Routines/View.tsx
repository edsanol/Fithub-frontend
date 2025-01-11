"use client";

import { DashboardHeader, PrimaryButton } from "@/presentation/components";
import { useRouter } from "next/navigation";

const Routines = () => {
  const router = useRouter();

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
    </>
  );
};

export default Routines;
