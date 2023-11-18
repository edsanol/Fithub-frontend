"use client";

import {
  CustomModal,
  FormInput,
  FormSelect,
  FormTextarea,
  PrimaryButton,
} from "@/presentation/components";
import React from "react";
import ViewModel from "./ViewModel";
import { Button } from "@nextui-org/react";
import { formatMembershipElements } from "@/presentation/helpers";

const Discounts = () => {
  const {
    handleSubmit,
    handleSetDiscountPercentage,
    handleSetStartDate,
    handleSetEndDate,
    handleSetIdMembership,
    handleSetComments,
    toggleModal,
    handleOpenModal,
    discountError,
    isModalOpen,
    modalMode,
    membershipList,
  } = ViewModel();
  return (
    <>
      <div className="flex justify-end">
        <PrimaryButton
          text="Crear descuento"
          btnType="button"
          customButtonClass="w-64 p-8"
          onClick={() => handleOpenModal("createModal")}
        />
      </div>
      <CustomModal
        isOpen={
          isModalOpen.createModal ||
          isModalOpen.editModal ||
          isModalOpen.detailsModal
        }
        onOpenChange={() =>
          toggleModal(
            modalMode === "create"
              ? "createModal"
              : modalMode === "edit"
              ? "editModal"
              : "detailsModal"
          )
        }
        size="2xl"
        content={
          <>
            <form className="mt-3" onSubmit={handleSubmit}>
              <FormInput
                isRequired
                isReadOnly={modalMode === "view" ? true : false}
                isInvalid={discountError?.discountPercentageError}
                color={
                  discountError?.discountPercentageError ? "danger" : "default"
                }
                errorMessage={
                  discountError?.discountPercentageError
                    ? "Por favor ingresa un porcentaje de descuento válido"
                    : ""
                }
                type="number"
                label="Porcentaje de descuento"
                size="lg"
                classNames={{ base: "dark" }}
                onChange={(value) => handleSetDiscountPercentage(value)}
              />
              <div className="mt-3">
                <FormSelect
                  isRequired
                  label="Membresías"
                  placeholder="Selecciona una membresía"
                  size="lg"
                  classNames={{ base: "dark" }}
                  popoverProps={{ color: "foreground" }}
                  items={formatMembershipElements(membershipList.items)}
                  customInputClass="mt-3"
                  onChange={(value) => handleSetIdMembership(value)}
                />
              </div>
              <div className="block md:flex md:gap-3">
                <FormInput
                  isRequired
                  isInvalid={discountError?.startDateError}
                  color={discountError?.startDateError ? "danger" : "default"}
                  errorMessage={
                    discountError?.startDateError
                      ? "Por favor ingresa una fecha válida"
                      : ""
                  }
                  type="date"
                  label="Fecha de inicio"
                  placeholder="Fecha de inicio"
                  labelPlacement="outside"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mt-5"
                  onChange={(value) => handleSetStartDate(value)}
                />
                <FormInput
                  isRequired
                  isInvalid={discountError?.endDateError}
                  color={discountError?.endDateError ? "danger" : "default"}
                  errorMessage={
                    discountError?.endDateError
                      ? "Por favor ingresa una fecha válida"
                      : ""
                  }
                  type="date"
                  label="Fecha de cierre"
                  placeholder="Fecha de cierre"
                  labelPlacement="outside"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mt-5"
                  onChange={(value) => handleSetEndDate(value)}
                />
              </div>
              <div className="mt-3">
                <FormTextarea
                  isRequired
                  isInvalid={discountError?.commentsError}
                  color={discountError?.commentsError ? "danger" : "default"}
                  errorMessage={
                    discountError?.commentsError
                      ? "Por favor ingresa una descripción válida"
                      : ""
                  }
                  isReadOnly={modalMode === "view" ? true : false}
                  label="Descripción"
                  placeholder="Escribe una descripción de la promoción"
                  size="lg"
                  classNames={{ base: "dark" }}
                  onChange={(value) => handleSetComments(value)}
                />
              </div>
              {modalMode === "create" || modalMode === "edit" ? (
                <div className="mt-5">
                  <PrimaryButton
                    text="Crear"
                    btnType="submit"
                    customButtonClass="w-full p-8"
                  />
                </div>
              ) : null}
            </form>
          </>
        }
        footerContent={
          modalMode === "view" ? (
            <>
              <Button
                color="danger"
                variant="ghost"
                onPress={() => toggleModal("detailsModal")}
              >
                Cerrar
              </Button>
            </>
          ) : null
        }
      />
    </>
  );
};

export default Discounts;
