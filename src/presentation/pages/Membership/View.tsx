"use client";

import React from "react";
import ViewModel from "./ViewModel";
import {
  FormInput,
  CustomModal,
  CustomTable,
  PrimaryButton,
  FormTextarea,
} from "@/presentation/components";
import WarningIcon from "@/assets/svg/WarningIcon";
import { Button } from "@nextui-org/react";
import { customRenderCell } from "./RenderCell";

const Membership = () => {
  const {
    handleSubmit,
    handleSetMembershipName,
    handleSetCost,
    handleSetDurationInDays,
    handleSetDescription,
    handleOpenModal,
    toggleModal,
    MembershipColumns,
    membershipList,
    membershipError,
    isModalOpen,
  } = ViewModel();

  return (
    <div>
      <div className="flex justify-end">
        <PrimaryButton
          text="Crear membresía"
          btnType="button"
          customButtonClass="w-64 p-8"
          onClick={() => toggleModal("createModal")}
        />
      </div>
      <CustomTable
        customRenderCell={(user, columnKey) =>
          customRenderCell(user, columnKey, { handleOpenModal })
        }
        records={membershipList}
        columns={MembershipColumns}
        uniqueKeyField="membershipID"
        customClassName="mt-8"
      />
      <CustomModal
        isOpen={isModalOpen.createModal}
        onOpenChange={() => toggleModal("createModal")}
        size="2xl"
        content={
          <>
            <form className="mt-3" onSubmit={handleSubmit}>
              <FormInput
                isRequired
                isInvalid={membershipError?.membershipNameError}
                color={
                  membershipError?.membershipNameError ? "danger" : "default"
                }
                errorMessage={
                  membershipError?.membershipNameError
                    ? "Por favor ingresa un nombre válido"
                    : ""
                }
                type="text"
                label="Nombre de la membresía"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mb-5"
                onChange={(value) => handleSetMembershipName(value)}
              />
              <FormInput
                isRequired
                isInvalid={membershipError?.costError}
                color={membershipError?.costError ? "danger" : "default"}
                errorMessage={
                  membershipError?.costError
                    ? "Por favor ingresa un precio válido"
                    : ""
                }
                type="number"
                label="Precio"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mb-5"
                onChange={(value) => handleSetCost(value)}
              />
              <FormInput
                isRequired
                isInvalid={membershipError?.durationInDaysError}
                color={
                  membershipError?.durationInDaysError ? "danger" : "default"
                }
                errorMessage={
                  membershipError?.durationInDaysError
                    ? "Por favor ingresa una duración válida"
                    : ""
                }
                type="number"
                label="Duración (días)"
                size="lg"
                classNames={{ base: "dark" }}
                onChange={(value) => handleSetDurationInDays(value)}
              />
              <div className="mt-3">
                <FormTextarea
                  isRequired
                  isInvalid={membershipError?.descriptionError}
                  color={
                    membershipError?.descriptionError ? "danger" : "default"
                  }
                  errorMessage={
                    membershipError?.descriptionError
                      ? "Por favor ingresa una descripción válida"
                      : ""
                  }
                  label="Descripción"
                  placeholder="Escribe una descripción de la membresía"
                  size="lg"
                  classNames={{ base: "dark" }}
                  onChange={(value) => handleSetDescription(value)}
                />
              </div>
              <div className="mt-5">
                <PrimaryButton
                  text="Crear"
                  btnType="submit"
                  customButtonClass="w-full p-8"
                />
              </div>
            </form>
          </>
        }
        // footerContent={
        //   <>
        //     <Button
        //       color="danger"
        //       variant="ghost"
        //       onPress={() => toggleModal("createModal")}
        //     >
        //       Cerrar
        //     </Button>
        //     <Button color="primary" onClick={() => handleSubmit}>
        //       Crear
        //     </Button>
        //   </>
        // }
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
              // onPress={() => {
              //   if (athleteUser) {
              //     deleteAthleteUser(athleteUser.athleteId!);
              //   }
              //   toggleModal("deleteModal");
              // }}
            >
              Si, eliminar
            </Button>
          </>
        }
      />
    </div>
  );
};

export default Membership;
