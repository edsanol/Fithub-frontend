"use client";

import {
  AuthHeader,
  FormInput,
  FormInputPassword,
  PrimaryButton,
} from "@/presentation/components";
import React from "react";
import ViewModel from "./ViewModel";

const ChangePassword = () => {
  const {
    handleSubmit,
    handleSetEmail,
    handleSetPassword,
    handleSetNewPassword,
    handleSetConfirmPassword,
    changePasswordDataError,
  } = ViewModel();

  return (
    <div className="w-full h-full bg-[#000]">
      <AuthHeader />
      <div className="w-11/12 mx-auto my-12 bg-[#121417] rounded-xl p-5 md:w-9/12 md:p-10 lg:w-3/5 xl:w-2/5">
        <h2 className="text-2xl text-white text-center md:font-bold lg:text-3xl">
          Cambiar contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            isRequired
            isInvalid={changePasswordDataError?.emailError}
            color={changePasswordDataError?.emailError ? "danger" : "default"}
            errorMessage={
              changePasswordDataError?.emailError
                ? "Por favor ingresa un nombre válido"
                : ""
            }
            type="email"
            label="Correo electrónico"
            size="lg"
            classNames={{ base: "dark" }}
            onChange={(value) => handleSetEmail(value)}
            customInputClass="mt-10"
          />
          <FormInputPassword
            isRequired
            isInvalid={changePasswordDataError?.passwordError}
            color={
              changePasswordDataError?.passwordError ? "danger" : "default"
            }
            errorMessage={
              changePasswordDataError?.passwordError
                ? "Por favor ingresa una contraseña válida"
                : ""
            }
            label="Contraseña actual"
            size="lg"
            classNames={{ base: "dark" }}
            onChange={(value) => handleSetPassword(value)}
            customInputClass="mt-5"
          />
          <div className="block md:flex md:gap-3">
            <FormInputPassword
              isRequired
              isInvalid={changePasswordDataError?.newPasswordError}
              color={
                changePasswordDataError?.newPasswordError ? "danger" : "default"
              }
              errorMessage={
                changePasswordDataError?.newPasswordError
                  ? "No puedes usar la misma contraseña"
                  : ""
              }
              label="Nueva contraseña"
              size="lg"
              classNames={{ base: "dark" }}
              onChange={(value) => handleSetNewPassword(value)}
              customInputClass="mt-5"
            />
            <FormInputPassword
              isRequired
              isInvalid={changePasswordDataError?.confirmPasswordError}
              color={
                changePasswordDataError?.confirmPasswordError
                  ? "danger"
                  : "default"
              }
              errorMessage={
                changePasswordDataError?.confirmPasswordError
                  ? "Las contraseñas no coinciden"
                  : ""
              }
              label="Confirmar contraseña"
              size="lg"
              classNames={{ base: "dark" }}
              onChange={(value) => handleSetConfirmPassword(value)}
              customInputClass="mt-5"
            />
          </div>
          <PrimaryButton
            text="Cambiar contraseña"
            btnType="submit"
            customButtonClass="mt-10 w-full p-8"
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
