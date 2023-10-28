"use client";

import React from "react";
import { subscriptionsPlans } from "@/assets/constants";
import { Link } from "@nextui-org/react";
import {
  FormInput,
  FormInputPassword,
  FormSelect,
  FormTextarea,
  PrimaryButton,
} from "@/presentation/components";
import { Header } from "./components";

const Register = () => {
  return (
    <>
      <div className="h-full bg-[#000]">
        <Header />
        <div className="w-11/12 mx-auto bg-[#121417] my-10 rounded-xl p-5 md:w-9/12 md:p-10 lg:w-1/2">
          <form action="#">
            <div className="block md:flex md:gap-3">
              <FormInput
                isRequired
                type="text"
                label="Nombre"
                size="lg"
                classNames={{ base: "dark" }}
              />
              <FormInput
                isRequired
                type="text"
                label="Dirección"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-5 md:mt-0"
              />
            </div>
            <div className="block md:flex md:gap-3">
              <FormInput
                isRequired
                type="text"
                label="NIT o razón social"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-5"
              />
              <FormInput
                isRequired
                type="text"
                label="Número de teléfono"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-5"
              />
            </div>
            <FormInput
              isRequired
              type="email"
              label="Correo electrónico"
              size="lg"
              classNames={{ base: "dark" }}
              description="Este correo será utilizado para iniciar sesión"
              customInputClass="mt-5"
            />
            <FormInputPassword
              isRequired
              label="Contraseña"
              size="lg"
              classNames={{ base: "dark" }}
              customInputClass="mt-5"
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
              />
            </div>
            <div className="mt-5">
              <FormTextarea
                label="Comentarios adicionales"
                placeholder="Escribe tus comentarios"
                size="lg"
                classNames={{ base: "dark" }}
              />
            </div>
            <PrimaryButton
              text="Registrarme"
              onClick={() => console.log("Click")}
              btnType="submit"
              customButtonClass="mt-5 w-full p-8"
            />
            <Link href="/login" className="mt-3">
              ¿Ya tienes una cuenta? Inicia sesión aquí
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
