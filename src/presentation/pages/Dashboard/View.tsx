"use client";

import CustomTable from "@/presentation/components/CustomTable";
import React from "react";
import ViewModel from "./ViewModel";
import CustomModal from "@/presentation/components/CustomModal";
import { FormInput, FormRadioButton } from "@/presentation/components";
import { genres } from "@/assets/constants";
import WarningIcon from "@/assets/svg/WarningIcon";

const Dashboard = () => {
  const {
    handleSetNumPage,
    handleSetTextFilter,
    handleModal,
    handleOpenModal,
    handleRedirect,
    handleOpenInfoModal,
    handleInfoModal,
    deleteAthleteUser,
    openModal,
    openInfoModal,
    athletesList,
    AthleteColumns,
    athleteUser,
  } = ViewModel();

  return (
    <div className="">
      <CustomTable
        onSetNumPage={handleSetNumPage}
        onSetTextFilter={handleSetTextFilter}
        onOpenModal={handleOpenModal}
        onRedirect={handleRedirect}
        onOpenInfoModal={handleOpenInfoModal}
        records={athletesList}
        columns={AthleteColumns}
      />
      <CustomModal
        isOpen={openModal}
        onOpenChange={handleModal}
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
                value={athleteUser?.genre ? athleteUser?.genre : ""}
              />
            </form>
          </>
        }
      />
      <CustomModal
        isOpen={openInfoModal}
        onOpenChange={handleInfoModal}
        size="2xl"
        onAction={deleteAthleteUser}
        data={athleteUser}
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
      />
    </div>
  );
};

export default Dashboard;
