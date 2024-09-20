"use client";

import {
  AuthHeader,
  CustomModal,
  FormInput,
  FormLink,
  InfoModal,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import { Button } from "@nextui-org/react";
import CheckIcon from "@/assets/svg/CheckIcon";

const Unsubscribe = () => {
  const {
    emailError,
    isModalOpen,
    erroModal,
    errorMessage,
    setErrorModal,
    handleEmail,
    handleSubmit,
    toggleModal,
  } = ViewModel();

  return (
    <div className="w-full h-full bg-[#000]">
      <AuthHeader />
      <div className="w-11/12 mx-auto my-12 bg-[#121417] rounded-xl p-5 md:w-9/12 md:p-10 lg:w-6/12">
        <h2 className="text-2xl text-white text-center md:font-bold lg:text-3xl">
          Eliminar cuenta
        </h2>
        <p className="text-sm text-gray-500 text-center mt-5">
          Nos entristece que te vayas. ¡Siempre serás bienvenido de vuelta!
        </p>
        <form>
          <FormInput
            isRequired
            isInvalid={emailError}
            color={emailError ? "danger" : "default"}
            errorMessage={emailError ? "Por favor ingresa un email válido" : ""}
            type="email"
            label="Correo electrónico"
            size="lg"
            customInputClass="mt-5"
            onChange={(value) => handleEmail(value)}
          />
          <PrimaryButton
            text="Eliminar cuenta"
            onClick={() => toggleModal()}
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
              <p className="text-sm text-center text-default-400 mt-5">
                Si decides irte, se eliminarán todos tus datos personales, como
                correo electrónico, número de teléfono y fecha de nacimiento.
                Además, perderás todo tu progreso, incluidos tus logros y
                estadísticas. Dejarás de tener acceso a nuestro contenido,
                actualizaciones futuras y soporte. Si en el futuro deseas
                regresar, tendrás que empezar desde cero y reconstruir todo
                desde el principio.
              </p>

              <p className="text-sm text-center text-default-400 mt-5">
                Nos entristece mucho verte partir y esperamos que reconsideres
                tu decisión. ¿Estás seguro de que deseas eliminar tu cuenta de{" "}
                <span className="font-bold">Fithub Connect</span>?
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

            <Button color="danger" onClick={handleSubmit}>
              Si, eliminar
            </Button>
          </>
        }
      />

      <InfoModal
        isOpen={erroModal}
        onOpenChange={setErrorModal}
        message={errorMessage}
      />
    </div>
  );
};

export default Unsubscribe;
