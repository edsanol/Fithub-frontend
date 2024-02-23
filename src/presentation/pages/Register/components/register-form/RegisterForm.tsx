"use client";

import React from "react";

import {
  FormInput,
  FormInputPassword,
  FormLink,
  FormSelect,
  FormTextarea,
  PrimaryButton,
} from "@/presentation/components";
import { subscriptionsPlans } from "@/assets/constants";
import ViewModel from "./ViewModel";

const RegisterForm = () => {
  const { handleSubmit, setField, gymDataError } = ViewModel();

  return (
    <>
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
            onChange={(value) => setField("gymName", value)}
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
            customInputClass="mt-5 md:mt-0"
            onChange={(value) => setField("address", value)}
          />
        </div>
        <div className="block md:flex md:gap-3">
          <FormInput
            isRequired
            isInvalid={gymDataError?.nitError}
            color={gymDataError?.nitError ? "danger" : "default"}
            errorMessage={
              gymDataError?.nitError ? "Por favor ingresa un NIT válido" : ""
            }
            type="text"
            label="NIT o razón social"
            size="lg"
            customInputClass="mt-5"
            onChange={(value) => setField("nit", value)}
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
            customInputClass="mt-5"
            onChange={(value) => setField("phoneNumber", value)}
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
          description="Este correo será utilizado para iniciar sesión"
          customInputClass="mt-5"
          onChange={(value) => setField("email", value)}
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
          customInputClass="mt-5"
          onChange={(value) => setField("password", value)}
        />
        <div className="mt-5">
          <FormSelect
            isRequired
            label="Membresías"
            placeholder="Selecciona un plan"
            size="lg"
            popoverProps={{ color: "foreground" }}
            items={subscriptionsPlans}
            onChange={(value) => setField("subscriptionPlan", value)}
          />
        </div>
        <div className="mt-5">
          <FormTextarea
            label="Comentarios adicionales"
            placeholder="Escribe tus comentarios"
            size="lg"
            onChange={(value) => setField("comments", value)}
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
    </>
  );
};

export default RegisterForm;
