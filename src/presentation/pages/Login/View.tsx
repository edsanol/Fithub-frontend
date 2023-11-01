"use client";

import {
  FormInput,
  FormInputPassword,
  PrimaryButton,
} from "@/presentation/components";
import { Link } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import bgRegister from "@/assets/images/bg-login.jpg";
import ViewModel from "./ViewModel";

const Login = () => {
  const { handleSubmit, handleSetEmail, handleSetPassword } = ViewModel();

  return (
    <div className="h-screen bg-[#121417] md:flex">
      <div className="hidden md:block md:w-1/2">
        <Image src={bgRegister} alt="image" className="h-full" />
      </div>
      <div className="p-6 md:w-1/2">
        <div className="mx-auto py-5 xl:w-4/5">
          <h1 className="text-3xl font-bold text-[#6B7280] text-right">
            FitHub
          </h1>
          <div className="py-5 mt-5 md:mt-10">
            <h2 className="text-2xl text-white text-left md:font-bold lg:text-3xl xl:mt-10">
              Bienvenido de vuelta
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <FormInput
              isRequired
              type="email"
              label="Correo electrónico"
              size="lg"
              classNames={{ base: "dark" }}
              customInputClass="mt-5 lg:mt-10"
              onChange={(value) => handleSetEmail(value)}
            />
            <Link
              href="/login"
              className="mt-8 text-xs md:text-sm lg:mt-10 lg:text-base"
            >
              ¿Has olvidado tu contraseña?
            </Link>
            <FormInputPassword
              isRequired
              label="Contraseña"
              size="lg"
              classNames={{ base: "dark" }}
              onChange={(value) => handleSetPassword(value)}
            />
            <PrimaryButton
              text="Iniciar sesión"
              btnType="submit"
              customButtonClass="mt-10 w-full p-8 lg:mt-12"
            />
          </form>
          <div className="w-full flex justify-center">
            <Link
              href="/register"
              className="mt-20 text-xs md:text-sm md:mt-10 lg:mt-20 xl:mt-56 xl:text-base"
            >
              ¿Todavía no tienes una cuenta? Crea una ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
