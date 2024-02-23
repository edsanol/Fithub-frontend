"use client";

import WarningIcon from "@/assets/svg/WarningIcon";
import {
  CustomModal,
  CustomTable,
  DashboardHeader,
  FormInput,
  FormRadioButton,
  FormSelect,
  PrimaryButton,
} from "@/presentation/components";
import { Button } from "@nextui-org/react";
import React from "react";
import ViewModel from "./ViewModel";
import { customRenderCell } from "./render-cell/RenderCell";
import { genres } from "@/assets/constants";
import { formatMembershipElements } from "@/presentation/helpers";

const UserList = () => {
  const {
    athletesList,
    athleteUser,
    isModalOpen,
    membership,
    AthleteColumns,
    deleteAthleteUser,
    handleOpenModal,
    handleRedirect,
    handleSetIdMembership,
    handleSetNumPage,
    handleSetTextFilter,
    toggleModal,
    updateMembership,
  } = ViewModel();

  return (
    <>
      <DashboardHeader
        title="Gestiona tu Gimnasio"
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
                  value={athleteUser?.athleteName}
                />
                <FormInput
                  isRequired
                  isReadOnly
                  type="text"
                  label="Apellidos"
                  size="lg"
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
                customInputClass="mt-7"
                value={athleteUser?.phoneNumber}
              />
              <FormInput
                isRequired
                isReadOnly
                type="email"
                label="Correo electrónico"
                size="lg"
                customInputClass="mt-7"
                value={athleteUser?.email}
              />
              <FormInput
                isRequired
                isReadOnly
                type="text"
                label="Membresía"
                size="lg"
                customInputClass="mt-7"
                value={
                  athleteUser?.membershipName
                    ? athleteUser?.membershipName
                    : "Sin membresía"
                }
              />
              <FormInput
                isRequired
                isReadOnly
                type="date"
                label="Fecha de nacimiento"
                placeholder="Fecha de nacimiento"
                labelPlacement="outside"
                size="lg"
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
        isOpen={isModalOpen.editMembershipModal}
        onOpenChange={() => toggleModal("editMembershipModal")}
        size="2xl"
        content={
          <>
            <DashboardHeader
              title="Editar membresía de atleta"
              description="Selecciona una membresía para asignarla al atleta."
            />
            <form className="mt-3" onSubmit={updateMembership}>
              <FormSelect
                isRequired
                label="Membresías"
                placeholder="Selecciona un plan"
                size="lg"
                popoverProps={{ color: "foreground" }}
                items={formatMembershipElements(membership)}
                onChange={(value) => handleSetIdMembership(value)}
              />
              <div className="mt-5">
                <PrimaryButton
                  text={"Guardar"}
                  btnType="submit"
                  customButtonClass="w-full p-8 mt-5"
                />
              </div>
            </form>
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
    </>
  );
};

export default UserList;
