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
    isModalOpen,
    modalMode,
    membershipList,
    toggleModal,
    handleOpenModal,
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
            <form className="mt-3">
              <FormInput
                isRequired
                isReadOnly={modalMode === "view" ? true : false}
                type="number"
                label="Porcentaje de descuento"
                size="lg"
                classNames={{ base: "dark" }}
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
                />
              </div>
              <div className="block md:flex md:gap-3">
                <FormInput
                  isRequired
                  type="date"
                  label="Fecha de inicio"
                  placeholder="Fecha de inicio"
                  labelPlacement="outside"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mt-5"
                />
                <FormInput
                  isRequired
                  type="date"
                  label="Fecha de cierre"
                  placeholder="Fecha de cierre"
                  labelPlacement="outside"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mt-5"
                />
              </div>
              <div className="mt-3">
                <FormTextarea
                  isRequired
                  isReadOnly={modalMode === "view" ? true : false}
                  label="Descripción"
                  placeholder="Escribe una descripción de la promoción"
                  size="lg"
                  classNames={{ base: "dark" }}
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
