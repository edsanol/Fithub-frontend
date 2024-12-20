"use client";

import { genres } from "@/assets/constants";
import {
  AuthHeader,
  FormInput,
  FormRadioButton,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";

const SelfRegistration = () => {
  const { gymIdValue } = ViewModel();

  console.log(gymIdValue);

  return (
    <>
      <div className="h-full bg-[#000]">
        <AuthHeader data-testid="auth-header" />
        <div className="w-11/12 mx-auto bg-[#121417] my-10 rounded-xl p-5 md:w-9/12 md:p-10 lg:w-8/12 xxl:w-1/2">
          <form data-testid="self-registration-form">
            <div className="block md:flex md:gap-3">
              <FormInput isRequired type="text" label="Nombres" size="lg" />
              <FormInput
                isRequired
                type="text"
                label="Apellidos"
                size="lg"
                customInputClass="mt-7 md:mt-0"
              />
            </div>
            <div className="block md:flex md:gap-3">
              <FormInput
                isRequired
                type="text"
                label="Número de documento"
                size="lg"
                customInputClass="mt-7"
              />
              <FormInput
                isRequired
                type="text"
                label="Número de teléfono"
                size="lg"
                customInputClass="mt-7"
              />
            </div>
            <FormInput
              isRequired
              type="email"
              label="Correo electrónico"
              size="lg"
              customInputClass="mt-7"
            />
            <FormInput
              isRequired
              type="date"
              label="Fecha de nacimiento"
              placeholder="Fecha de nacimiento"
              size="lg"
              customInputClass="mt-5"
            />
            <FormRadioButton
              label="Selecciona el genero del deportista"
              customClass="mt-5"
              options={genres}
            />
            <PrimaryButton
              text="Guardar"
              btnType="submit"
              customButtonClass="mt-8 w-full p-8"
            />
          </form>
        </div>
      </div>

      {/* <InfoModal
        isOpen={errorModal}
        onOpenChange={setErrorModal}
        message={errorMessage}
      /> */}
    </>
  );
};

export default SelfRegistration;
