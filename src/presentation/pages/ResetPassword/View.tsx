"use client";

import {
  AuthHeader,
  FormInputPassword,
  PrimaryButton,
} from "@/presentation/components";
import React from "react";
import ViewModel from "./ViewModel";

const ResetPassword = () => {
  const {
    handleSubmit,
    handleSetConfirmPassword,
    handleSetNewPassword,
    resetPasswordData,
    resetPasswordDataError,
  } = ViewModel();

  return (
    <div className="w-full h-full bg-[#000]">
      <AuthHeader />
      <div className="w-11/12 mx-auto my-12 bg-[#121417] rounded-xl p-5 md:w-9/12 md:p-10 lg:w-3/5 xl:w-2/5">
        <h2 className="text-2xl text-white text-center md:font-bold lg:text-3xl">
          Restablecer contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <FormInputPassword
            isRequired
            isInvalid={resetPasswordDataError?.newPasswordError}
            color={
              resetPasswordDataError?.newPasswordError ? "danger" : "default"
            }
            errorMessage={
              resetPasswordDataError?.newPasswordError
                ? "Por favor ingresa una contraseña válida"
                : ""
            }
            label="Nueva contraseña"
            size="lg"
            classNames={{ base: "dark" }}
            onChange={(value) => handleSetNewPassword(value)}
            customInputClass="mt-8"
          />
          <FormInputPassword
            isRequired
            isInvalid={resetPasswordDataError?.confirmPasswordError}
            color={
              resetPasswordDataError?.confirmPasswordError
                ? "danger"
                : "default"
            }
            errorMessage={
              resetPasswordDataError?.confirmPasswordError
                ? "Las contraseñas no coinciden"
                : ""
            }
            label="Confirmar contraseña"
            size="lg"
            classNames={{ base: "dark" }}
            onChange={(value) => handleSetConfirmPassword(value)}
            customInputClass="mt-5"
          />
          <PrimaryButton
            text="Restablecer contraseña"
            btnType="submit"
            customButtonClass="mt-10 w-full p-8"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
