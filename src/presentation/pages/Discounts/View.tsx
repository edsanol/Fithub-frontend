"use client";

import {
  CustomModal,
  CustomTable,
  FormInput,
  FormSelect,
  FormTextarea,
  PrimaryButton,
} from "@/presentation/components";
import React from "react";
import ViewModel from "./ViewModel";
import { Button } from "@nextui-org/react";
import { formatMembershipElements } from "@/presentation/helpers";
import { customRenderCell } from "./RenderCell";
import WarningIcon from "@/assets/svg/WarningIcon";

const Discounts = () => {
  const {
    handleSubmit,
    deleteDiscount,
    handleSetDiscountPercentage,
    handleSetStartDate,
    handleSetEndDate,
    handleSetIdMembership,
    handleSetComments,
    toggleModal,
    handleOpenModal,
    discount,
    DiscountsColumns,
    discountsList,
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
      <CustomTable
        customRenderCell={(user, columnKey) =>
          customRenderCell(user, columnKey, { handleOpenModal })
        }
        records={discountsList}
        columns={DiscountsColumns}
        uniqueKeyField="discountId"
        customClassName="mt-8"
      />
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
                value={
                  discount?.discountPercentage !== 0
                    ? discount?.discountPercentage
                    : null
                }
              />
              <div className="mt-3">
                <FormSelect
                  isRequired
                  isDisabled={modalMode === "view" ? true : false}
                  label="Membresías"
                  placeholder="Selecciona una membresía"
                  size="lg"
                  classNames={{ base: "dark" }}
                  popoverProps={{ color: "foreground" }}
                  items={formatMembershipElements(membershipList.items)}
                  customInputClass="mt-3"
                  onChange={(value) => handleSetIdMembership(value)}
                  value={discount?.idMembership}
                />
              </div>
              <div className="block md:flex md:gap-3">
                <FormInput
                  isRequired
                  isReadOnly={modalMode === "view" ? true : false}
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
                  value={discount?.startDate.slice(0, 10)}
                />
                <FormInput
                  isRequired
                  isReadOnly={modalMode === "view" ? true : false}
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
                  value={discount?.endDate.slice(0, 10)}
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
                  value={discount?.comments}
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
                ¿Estás seguro de eliminar este descuento?
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
                if (discount) {
                  deleteDiscount(discount.discountId!);
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

export default Discounts;
