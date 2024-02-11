"use client";

import React from "react";
import ViewModel from "./ViewModel";
import {
  FormInput,
  FormRadioButton,
  CustomModal,
  CustomTable,
  DashboardHeader,
  FormSelect,
  PrimaryButton,
} from "@/presentation/components";
import { genres } from "@/assets/constants";
import WarningIcon from "@/assets/svg/WarningIcon";
import { Button } from "@nextui-org/react";
import { customRenderCell } from "./RenderCell";
import { formatMembershipElements } from "@/presentation/helpers";
import CustomDashboardGraph from "@/presentation/components/CustomDashboardGraph";
import CustomDashboardData from "@/presentation/components/CustomDashboardData";
import CustomDashboardDoubleGraph from "@/presentation/components/CustomDashboardDoubleGraph";
import CustomAssistanceGraph from "@/presentation/components/CustomAssistanceGraph";
import CustomMembershipDistributionGraph from "@/presentation/components/CustomMembershipDistributionGraph";
import CustomIncomeGraph from "@/presentation/components/CustomIncomeGraph";

const Dashboard = () => {
  const {
    AthleteColumns,
    athletesList,
    athleteUser,
    isModalOpen,
    membership,
    dashboardData,
    getDailyAssistanceGraphic,
    getMembershipGraphic,
    getIncomeGraphic,
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
    <div>
      <DashboardHeader
        title="Gestiona tu Gimnasio"
        description="
        Explora la lista completa de tus atletas y encuéntralos rápidamente usando el filtro por nombre. Visualiza todos sus detalles y, si es necesario, elimina perfiles de manera sencilla."
        customClassName="mb-5"
      />
      <div className="flex flex-wrap gap-4 justify-between">
        <CustomDashboardData data={dashboardData} />
        <CustomDashboardDoubleGraph dashboardData={dashboardData} />
        <CustomDashboardGraph dashboardData={dashboardData} />
      </div>
      <div className="flex flex-wrap gap-2 justify-center py-8 lg:justify-between">
        <CustomAssistanceGraph initialData={getDailyAssistanceGraphic} />
        <CustomMembershipDistributionGraph initialData={getMembershipGraphic} />
      </div>
      <div className="flex flex-wrap gap-2 justify-center py-8 lg:justify-between">
        <CustomIncomeGraph initialData={getIncomeGraphic} />
      </div>
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
                type="text"
                label="Membresía"
                size="lg"
                classNames={{ base: "dark" }}
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
                classNames={{ base: "dark" }}
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
    </div>
  );
};

export default Dashboard;
