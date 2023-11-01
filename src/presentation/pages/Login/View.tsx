"use client";

import {
  AuthHeader,
  FormInput,
  FormInputPassword,
  PrimaryButton,
} from "@/presentation/components";
import { Link } from "@nextui-org/react";
import React from "react";

const Login = () => {
  return (
    <div className="w-full h-full bg-[#000]">
      <AuthHeader />
      <div className="w-11/12 mx-auto my-12 bg-[#121417] rounded-xl p-5 md:w-9/12 md:p-10 lg:w-3/5 xl:w-2/5">
        <h2 className="text-2xl text-white text-center md:font-bold lg:text-3xl">
          Bienvenido de vuelta
        </h2>
        <form action="#">
          <FormInput
            isRequired
            type="email"
            label="Correo electrónico"
            size="lg"
            classNames={{ base: "dark" }}
            customInputClass="mt-10"
          />
          <Link href="/login" className="mt-8 text-sm lg:text-base">
            ¿Has olvidado tu contraseña?
          </Link>
          <FormInputPassword
            isRequired
            label="Contraseña"
            size="lg"
            classNames={{ base: "dark" }}
          />
          <PrimaryButton
            text="Iniciar sesión"
            onClick={() => console.log("Click")}
            btnType="submit"
            customButtonClass="mt-10 w-full p-8"
          />
        </form>
        <div className="w-full flex justify-center">
          <Link
            href="/register"
            className="mt-20 text-sm md:mt-10 xl:text-base"
          >
            ¿Todavía no tienes una cuenta? Crea una ahora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
