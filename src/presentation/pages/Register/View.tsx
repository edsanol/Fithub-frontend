"use client";

import React, { useState } from "react";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { subscriptionsPlans } from "@/assets/constants";
import { EyeSlashFilledIcon } from "@/assets/svg/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/assets/svg/EyeFilledIcon";
import { Link } from "@nextui-org/react";
import { PrimaryButton } from "@/presentation/components";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <div className="h-full bg-[#000]">
        <div className="w-full h-auto bg-[#121417] p-5">
          <div className="flex justify-center">
            <h1 className="text-3xl text-[#3669FC] font-black">FitHub</h1>
          </div>
        </div>
        <div className="w-11/12 mx-auto bg-[#121417] my-10 rounded-xl p-5 md:w-9/12 md:p-10 lg:w-1/2">
          <form action="#">
            <div className="block md:flex md:gap-3">
              <Input
                isRequired
                type="text"
                label="Nombre"
                size="lg"
                classNames={{ base: "dark" }}
              />
              <Input
                isRequired
                type="text"
                label="Dirección"
                size="lg"
                classNames={{ base: "dark" }}
                className="mt-5 md:mt-0"
              />
            </div>
            <div className="block md:flex md:gap-3">
              <Input
                isRequired
                type="text"
                label="NIT o razón social"
                size="lg"
                classNames={{ base: "dark" }}
                className="mt-5"
              />
              <Input
                isRequired
                type="text"
                label="Número de teléfono"
                size="lg"
                classNames={{ base: "dark" }}
                className="mt-5"
              />
            </div>
            <Input
              isRequired
              type="email"
              label="Correo electrónico"
              size="lg"
              classNames={{ base: "dark" }}
              description="Este correo será utilizado para iniciar sesión"
              className="mt-5"
            />
            <Input
              isRequired
              label="Contraseña"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              size="lg"
              classNames={{ base: "dark" }}
              className="mt-5"
            />
            <div className="mt-5">
              <Select
                isRequired
                label="Membresias"
                placeholder="Selecciona un plan"
                size="lg"
                classNames={{ base: "dark" }}
                popoverProps={{ color: "foreground" }}
              >
                {subscriptionsPlans.map((plan) => (
                  <SelectItem
                    key={plan.value}
                    value={plan.value}
                    classNames={{ base: "dark" }}
                  >
                    {plan.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="mt-5">
              <Textarea
                label="Comentarios adicionales"
                labelPlacement="outside"
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
            <Link href="#" className="mt-3">
              ¿Ya tienes una cuenta? Inicia sesión aquí
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
