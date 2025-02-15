"use client";

import WarningIcon from "@/assets/svg/WarningIcon";
import {
  CustomModal,
  CustomTable,
  DashboardHeader,
  FormCheckbox,
  FormInput,
  FormRadioButton,
  FormSelect,
  InfoModal,
  PrimaryButton,
} from "@/presentation/components";
import { Button } from "@nextui-org/react";
import ViewModel from "./ViewModel";
import { customRenderCell } from "./components/table-render-cell/RenderCell";
import { genres } from "@/assets/constants";
import { formatMembershipElements } from "@/presentation/helpers";

const UserList = () => {
  const {
    athletesList,
    athleteUser,
    isModalOpen,
    membership,
    AthleteColumns,
    errorModal,
    errorMessage,
    updateMembershipToAthlete,
    paymentEnabled,
    discountEnabled,
    totalPaid,
    paymentAmount,
    setErrorModal,
    deleteAthleteUser,
    handleOpenModal,
    handleRedirect,
    setField,
    handleSetNumPage,
    handleSetTextFilter,
    handleSetStatusFilter,
    toggleModal,
    updateMembership,
    toogleCheckboxes,
    setPaymentAmountField,
    registerPaymentAmount,
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
        onSetStatusFilter={handleSetStatusFilter}
        customRenderCell={(user, columnKey) => customRenderCell(user, columnKey, { handleOpenModal, handleRedirect })}
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
              <div className="block md:flex md:gap-3">
                <FormInput
                  isRequired
                  isReadOnly
                  type="text"
                  label="Número de documento"
                  size="lg"
                  customInputClass="mt-7"
                  value={
                    athleteUser?.documentID
                      ? athleteUser?.documentID
                      : "Sin documento"
                  }
                />
                <FormInput
                  isRequired
                  isReadOnly
                  type="text"
                  label="Número de teléfono"
                  size="lg"
                  customInputClass="mt-7"
                  value={athleteUser?.phoneNumber}
                />
              </div>
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
                onChange={(value) => setField("membershipId", value)}
                value={String(updateMembershipToAthlete?.membershipId) || ""}
              />
              <FormInput
                isRequired
                type="date"
                label="Inicio de membresía (dd/mm/aaaa)"
                placeholder="Fecha de inicio de membresía"
                size="lg"
                customInputClass="mt-5"
                onChange={(value) => setField("startMembershipDate", value)}
                value={updateMembershipToAthlete?.startMembershipDate}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <FormCheckbox
                    customClassNames="mt-2"
                    label="¿Pago por abono?"
                    selected={paymentEnabled}
                    onValueChange={() => toogleCheckboxes("payment")}
                  />

                  {paymentEnabled && (
                    <div className="mt-3">
                      <FormInput
                        type="number"
                        label="Monto Abonado"
                        placeholder="Ej: 50000"
                        size="lg"
                        onChange={(value) => setField("paymentAmount", Number(value))}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <FormCheckbox
                    customClassNames="mt-2"
                    label="¿Aplicar descuento?"
                    selected={discountEnabled}
                    onValueChange={() => toogleCheckboxes("discount")}
                  />

                  {discountEnabled && (
                    <div className="mt-3">
                      <FormInput
                        type="number"
                        label="Valor del descuento"
                        placeholder="Ej: 20000"
                        size="lg"
                        onChange={(value) => setField("discount", Number(value))}
                      />
                    </div>
                  )}
                </div>
              </div>
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

      <CustomModal
        isOpen={isModalOpen.paymentAmountModal}
        onOpenChange={() => toggleModal("paymentAmountModal")}
        size="2xl"
        content={
          <>
            <DashboardHeader
              title="Estado de pago"
              description="Ingresa el monto abonado por el atleta."
            />
            <div className="block md:flex md:gap-3">
              <FormInput
                isReadOnly
                type="text"
                label="Total Pagado"
                size="lg"
                value={totalPaid?.totalPaid}
              />
              <FormInput
                isReadOnly
                type="text"
                label="Cantidad Pendiente"
                size="lg"
                customInputClass="mt-7 md:mt-0"
                value={totalPaid?.remainingAmount}
              />
            </div>
            <form className="mt-3" onSubmit={registerPaymentAmount}>
              <FormInput
                type="number"
                label="Monto Abonado"
                placeholder="Ej: 50000"
                size="lg"
                onChange={(value) => setPaymentAmountField("paymentAmount", Number(value))}
              />
              <FormInput
                isRequired
                type="date"
                label="Fecha de Pago (dd/mm/aaaa)"
                size="lg"
                customInputClass="mt-5"
                onChange={(value) => setPaymentAmountField("paymentDate", value)}
                value={paymentAmount?.paymentDate}
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

      <InfoModal
        isOpen={errorModal}
        onOpenChange={setErrorModal}
        message={errorMessage}
      />
    </>
  );
};

export default UserList;
