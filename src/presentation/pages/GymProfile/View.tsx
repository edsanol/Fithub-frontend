"use client";

import React from "react";
import { Avatar } from "@nextui-org/react";
import { subscriptionsPlans } from "@/assets/constants";
import {
  FormInput,
  FormInputPassword,
  FormLink,
  FormSelect,
  FormTextarea,
  PrimaryButton,
} from "@/presentation/components";
import EditIcon from "@/assets/svg/EditIcon";
import { Button } from "@nextui-org/react";
import ViewModel from "./ViewModel";

const GymProfile = () => {
  const {
    handleSubmit,
    handleSetGymName,
    handleSetEmail,
    handleSetAddress,
    handleSetPhoneNumber,
    handleSetComments,
    handleSetNit,
    handleClick,
    isClicked,
    gymData,
    gymDataError,
  } = ViewModel();

  return (
    <>
      <div className="h-full bg-[#000]">
        <div className="w-full mx-auto bg-[#121417] rounded-xl p-5 md:p-10 xl:w-10/12">
          {/* <Avatar
            showFallback
            src="https://images.unsplash.com/broken"
            className="w-32 h-32 mx-auto text-large"
          />
          <div className="w-1/2 mx-auto mt-5 flex justify-center">
            <h1 className="text-xl">The Ultimate Warrior Gym</h1>
          </div> */}

          {/* <div className="w-1/2 mx-auto mt-5 flex justify-center gap-5">
            <div className="flex flex-col">
              <h3 className="text-base">Usuarios</h3>
              <p className="text-sm mx-auto">12</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-base">Activos</h3>
              <p className="text-sm mx-auto">12</p>
            </div>
          </div> */}

          <div className="w-full flex justify-end">
            <Button
              color="primary"
              variant="ghost"
              startContent={<EditIcon />}
              onClick={handleClick}
            >
              Editar perfil
            </Button>
          </div>

          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="block md:flex md:gap-3">
              <FormInput
                isRequired
                isReadOnly={!isClicked}
                isInvalid={gymDataError?.gymNameError}
                color={gymDataError?.gymNameError ? "danger" : "default"}
                errorMessage={
                  gymDataError?.gymNameError
                    ? "Por favor ingresa un nombre válido"
                    : ""
                }
                type="text"
                label="Nombre"
                size="lg"
                classNames={{ base: "dark" }}
                value={gymData?.gymName}
                onChange={(value) => handleSetGymName(value)}
              />
              <FormInput
                isRequired
                isReadOnly={!isClicked}
                isInvalid={gymDataError?.addressError}
                color={gymDataError?.addressError ? "danger" : "default"}
                errorMessage={
                  gymDataError?.addressError
                    ? "Por favor ingresa una dirección válida"
                    : ""
                }
                type="text"
                label="Dirección"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-5 md:mt-0"
                value={gymData?.address}
                onChange={(value) => handleSetAddress(value)}
              />
            </div>
            <div className="block md:flex md:gap-3">
              <FormInput
                isReadOnly={!isClicked}
                type="text"
                label="NIT o razón social"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-5"
                onChange={(value) => handleSetNit(value)}
              />
              <FormInput
                isRequired
                isReadOnly={!isClicked}
                isInvalid={gymDataError?.phoneNumberError}
                color={gymDataError?.phoneNumberError ? "danger" : "default"}
                errorMessage={
                  gymDataError?.phoneNumberError
                    ? "Por favor ingresa un número de teléfono válido"
                    : ""
                }
                type="text"
                label="Número de teléfono"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-5"
                value={gymData?.phoneNumber}
                onChange={(value) => handleSetPhoneNumber(value)}
              />
            </div>
            <FormInput
              isRequired
              isReadOnly={!isClicked}
              isInvalid={gymDataError?.emailError}
              color={gymDataError?.emailError ? "danger" : "default"}
              errorMessage={
                gymDataError?.emailError
                  ? "Por favor ingresa un correo electrónico válido"
                  : ""
              }
              type="email"
              label="Correo electrónico"
              size="lg"
              classNames={{ base: "dark" }}
              customInputClass="mt-5"
              value={gymData?.email}
              onChange={(value) => handleSetEmail(value)}
            />
            <div className="mt-5">
              <FormInput
                isRequired
                isReadOnly
                type="text"
                label="Membresías"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-5"
                value={gymData?.subscriptionPlan}
              />
            </div>
            <div className="mt-5">
              <FormTextarea
                isReadOnly={!isClicked}
                value={gymData?.comments}
                label="Comentarios adicionales"
                placeholder="Escribe tus comentarios"
                size="lg"
                classNames={{ base: "dark" }}
                onChange={(value) => handleSetComments(value)}
              />
            </div>
            <PrimaryButton
              text="Guardar cambios"
              btnType="submit"
              customButtonClass={
                "mt-5 w-full p-8" + (!isClicked ? " hidden" : "")
              }
            />
            <FormLink
              href="/login"
              text="Cambiar contraseña"
              customLinkClass="mt-3"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default GymProfile;
