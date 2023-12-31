"use client";

import React from "react";
import ViewModel from "./ViewModel";
import {
  FormInput,
  FormRadioButton,
  CustomModal,
  CustomTable,
  DashboardHeader,
} from "@/presentation/components";
import { genres } from "@/assets/constants";
import WarningIcon from "@/assets/svg/WarningIcon";
import { Button } from "@nextui-org/react";
import { customRenderCell } from "./RenderCell";

const Dashboard = () => {
  const {
    handleSetNumPage,
    handleSetTextFilter,
    handleOpenModal,
    handleRedirect,
    deleteAthleteUser,
    toggleModal,
    athletesList,
    AthleteColumns,
    athleteUser,
    isModalOpen,
  } = ViewModel();

  return (
    <div>
      <DashboardHeader
        title="Gestiona tus Atletas"
        description="
        Explora la lista completa de tus atletas y encuéntralos rápidamente usando el filtro por nombre. Visualiza todos sus detalles y, si es necesario, elimina perfiles de manera sencilla."
        customClassName="mb-5"
      />
      <CustomTable
        onSetNumPage={handleSetNumPage}
        onSetTextFilter={handleSetTextFilter}
        customRenderCell={(user, columnKey) =>
          customRenderCell(user, columnKey, { handleOpenModal, handleRedirect })
        }
        records={athletesList}
        columns={AthleteColumns}
        uniqueKeyField="athleteId"
      />
      <CustomModal
        isOpen={isModalOpen.detailsModal}
        onOpenChange={() => toggleModal("detailsModal")}
        size="2xl"
        content={
          <>
            <form className="mt-3">
              <div className="block md:flex md:gap-3">
                <FormInput
                  isRequired
                  isReadOnly
                  type="text"
                  label="Nombres"
                  size="lg"
                  classNames={{ base: "dark" }}
                  value={athleteUser?.athleteName}
                />
                <FormInput
                  isRequired
                  isReadOnly
                  type="text"
                  label="Apellidos"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mt-7 md:mt-0"
                  value={athleteUser?.athleteLastName}
                />
              </div>
              <FormInput
                isRequired
                isReadOnly
                type="text"
                label="Número de teléfono"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-7"
                value={athleteUser?.phoneNumber}
              />
              <FormInput
                isRequired
                isReadOnly
                type="email"
                label="Correo electrónico"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-7"
                value={athleteUser?.email}
              />
              <FormInput
                isRequired
                isReadOnly
                type="date"
                label="Fecha de nacimiento"
                placeholder="Fecha de nacimiento"
                labelPlacement="outside"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-5"
                value={athleteUser?.birthDate.slice(0, 10)}
              />
              <FormRadioButton
                isDisabled
                label="Selecciona el genero del deportista"
                customClass="mt-5"
                options={genres}
                value={athleteUser?.genre}
              />
            </form>
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
                ¿Estás seguro de eliminar este usuario?
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
                if (athleteUser) {
                  deleteAthleteUser(athleteUser.athleteId!);
                }
                toggleModal("deleteModal");
              }}
            >
              Si, eliminar
            </Button>
          </>
        }
      />
    </div>
  );
};

export default Dashboard;
