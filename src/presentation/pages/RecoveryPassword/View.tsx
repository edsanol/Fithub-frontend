"use client";

import {
  AuthHeader,
  CustomModal,
  FormInput,
  PrimaryButton,
} from "@/presentation/components";
import React from "react";
import ViewModel from "./ViewModel";
import { Button } from "@nextui-org/react";
import CheckIcon from "@/assets/svg/CheckIcon";

const RecoveryPassword = () => {
  const { emailError, isModalOpen, handleEmail, handleSubmit, toggleModal } =
    ViewModel();

  return (
    <div className="w-full h-full bg-[#000]">
      <AuthHeader />
      <div className="w-11/12 mx-auto my-12 bg-[#121417] rounded-xl p-5 md:w-9/12 md:p-10 lg:w-3/5 xl:w-2/5">
        <h2 className="text-2xl text-white text-center md:font-bold lg:text-3xl">
          Recuperar contraseña
        </h2>
        <p className="text-sm text-gray-500 text-center mt-5">
          Pronto recibirás un enlace en tu correo electrónico. Haz clic en él
          para ir directamente a la pestaña de recuperación de contraseña.
        </p>
        <form onSubmit={handleSubmit}>
          <FormInput
            isRequired
            isInvalid={emailError}
            color={emailError ? "danger" : "default"}
            errorMessage={emailError ? "Por favor ingresa un email válido" : ""}
            type="email"
            label="Correo electrónico"
            size="lg"
            classNames={{ base: "dark" }}
            customInputClass="mt-5"
            onChange={(value) => handleEmail(value)}
          />
          <PrimaryButton
            text="Enviar correo de recuperación"
            btnType="submit"
            customButtonClass="mt-10 w-full p-8"
          />
        </form>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onOpenChange={() => toggleModal()}
        size="lg"
        content={
          <>
            <div className="mt-3 flex flex-col justify-center">
              <div className="mx-auto">
                <CheckIcon />
              </div>
              <p className="text-lg text-center mt-5">
                A tu correo electrónico se ha enviado un enlace para recuperar
                tu contraseña.
              </p>
              <p className="text-sm text-center text-default-400">
                Si no lo encuentras, revisa tu carpeta de spam.
              </p>
            </div>
          </>
        }
        footerContent={
          <>
            <Button
              color="primary"
              variant="ghost"
              onPress={() => toggleModal()}
            >
              Cerrar
            </Button>
          </>
        }
      />
    </div>
  );
};

export default RecoveryPassword;
