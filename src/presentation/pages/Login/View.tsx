"use client";

import {
  AuthHeader,
  FormInput,
  FormInputPassword,
  FormLink,
  PrimaryButton,
} from "@/presentation/components";
import React from "react";
import ViewModel from "./ViewModel";

const Login = () => {
  const {
    handleSubmit,
    handleSetEmail,
    handleSetPassword,
    emailError,
    passwordError,
  } = ViewModel();

  return (
    <div className="w-full h-full bg-[#000]">
      <AuthHeader />
      <div className="w-11/12 mx-auto my-12 bg-[#121417] rounded-xl p-5 md:w-9/12 md:p-10 lg:w-3/5 xl:w-2/5">
        <h2 className="text-2xl text-white text-center md:font-bold lg:text-3xl">
          Bienvenido de vuelta
        </h2>
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
          <FormLink
            href="/login"
            text="¿Has olvidado tu contraseña?"
            customLinkClass="mt-8 text-sm lg:text-base"
          />
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
        <div className="w-full flex justify-center">
          <FormLink
            href="/register"
            text="¿Todavía no tienes una cuenta? Crea una ahora"
            customLinkClass="mt-20 text-sm md:mt-10 xl:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
