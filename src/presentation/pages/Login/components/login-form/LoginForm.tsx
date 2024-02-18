"use client";

import React from "react";
import ViewModel from "./ViewModel";
import {
  FormInput,
  FormInputPassword,
  FormLink,
  PrimaryButton,
} from "../../../../components";

export const LoginForm = () => {
  const {
    handleSubmit,
    handleSetEmail,
    handleSetPassword,
    emailError,
    passwordError,
  } = ViewModel();

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        isRequired
        isInvalid={emailError}
        color={emailError ? "danger" : "default"}
        errorMessage={
          emailError
            ? "Credenciales invalidas, email y/o contraseña incorrectos."
            : ""
        }
        type="email"
        label="Correo electrónico"
        size="lg"
        classNames={{ base: "dark" }}
        customInputClass="mt-10"
        onChange={(value) => handleSetEmail(value)}
      />
      <div className="flex justify-end">
        <FormLink
          href="/recovery-password"
          text="¿Has olvidado tu contraseña?"
          customLinkClass="mt-8 text-sm lg:text-base"
        />
      </div>
      <FormInputPassword
        isRequired
        isInvalid={passwordError}
        color={passwordError ? "danger" : "default"}
        errorMessage={
          passwordError
            ? "Credenciales invalidas, email y/o contraseña incorrectos."
            : ""
        }
        label="Contraseña"
        size="lg"
        classNames={{ base: "dark" }}
        onChange={(value) => handleSetPassword(value)}
      />
      <PrimaryButton
        text="Iniciar sesión"
        btnType="submit"
        customButtonClass="mt-10 w-full p-8"
      />
    </form>
  );
};
