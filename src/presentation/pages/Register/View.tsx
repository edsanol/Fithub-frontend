"use client";

import React from "react";
import { subscriptionsPlans } from "@/assets/constants";
import {
  AuthHeader,
  FormInput,
  FormInputPassword,
  FormLink,
  FormSelect,
  FormTextarea,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";

const Register = () => {
  const {
    handleSubmit,
    handleSetGymName,
    handleSetEmail,
    handleSetPassword,
    handleSetAddress,
    handleSetPhoneNumber,
    handleSetRegisterDate,
    handleSetSubscriptionPlan,
    handleSetComments,
    handleSetNit,
    gymDataError,
  } = ViewModel();

  return (
    <>
      <div className="h-full bg-[#000]">
        <AuthHeader />
        <div className="w-11/12 mx-auto bg-[#121417] my-10 rounded-xl p-5 md:w-9/12 md:p-10 lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="block md:flex md:gap-3">
              <FormInput
                isRequired
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
                onChange={(value) => handleSetGymName(value)}
              />
              <FormInput
                isRequired
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
                onChange={(value) => handleSetAddress(value)}
              />
            </div>
            <div className="block md:flex md:gap-3">
              <FormInput
                isRequired
                isInvalid={gymDataError?.nitError}
                color={gymDataError?.nitError ? "danger" : "default"}
                errorMessage={
                  gymDataError?.nitError
                    ? "Por favor ingresa un NIT válido"
                    : ""
                }
                type="text"
                label="NIT o razón social"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-5"
                onChange={(value) => handleSetNit(value)}
              />
              <FormInput
                isRequired
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
                onChange={(value) => handleSetPhoneNumber(value)}
              />
            </div>
            <FormInput
              isRequired
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
              description="Este correo será utilizado para iniciar sesión"
              customInputClass="mt-5"
              onChange={(value) => handleSetEmail(value)}
            />
            <FormInputPassword
              isRequired
              isInvalid={gymDataError?.passwordError}
              color={gymDataError?.passwordError ? "danger" : "default"}
              errorMessage={
                gymDataError?.passwordError
                  ? "Por favor ingresa una contraseña válida"
                  : ""
              }
              label="Contraseña"
              size="lg"
              classNames={{ base: "dark" }}
              customInputClass="mt-5"
              onChange={(value) => handleSetPassword(value)}
            />
            <div className="mt-5">
              <FormSelect
                isRequired
                label="Membresías"
                placeholder="Selecciona un plan"
                size="lg"
                classNames={{ base: "dark" }}
                popoverProps={{ color: "foreground" }}
                items={subscriptionsPlans}
                onChange={(value) => handleSetSubscriptionPlan(value)}
              />
            </div>
            <div className="mt-5">
              <FormTextarea
                label="Comentarios adicionales"
                placeholder="Escribe tus comentarios"
                size="lg"
                classNames={{ base: "dark" }}
                onChange={(value) => handleSetComments(value)}
              />
            </div>
            <PrimaryButton
              text="Registrarme"
              btnType="submit"
              customButtonClass="mt-5 w-full p-8"
            />
            <FormLink
              href="/login"
              text="¿Ya tienes una cuenta? Inicia sesión aquí"
              customLinkClass="mt-3"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
