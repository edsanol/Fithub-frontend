"use client";

import { genres } from "@/assets/constants";
import {
  AuthHeader,
  CustomModal,
  FormInput,
  FormRadioButton,
  InfoModal,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import CheckIcon from "@/assets/svg/CheckIcon";
import AndroidIcon from "@/assets/svg/AndroidIcon";
import IOSIcon from "@/assets/svg/IOSIcon";
import { Button } from "@nextui-org/react";

const SelfRegistration = () => {
  const {
    errorMessage,
    errorModal,
    athleteDataError,
    toogleModal,
    handleDownloadApp,
    setToogleModal,
    setErrorModal,
    setField,
    handleSubmit,
  } = ViewModel();

  return (
    <>
      <div className="h-full bg-[#000]">
        <AuthHeader data-testid="auth-header" />
        <div className="w-11/12 mx-auto bg-[#121417] my-10 rounded-xl p-5 md:w-9/12 md:p-10 lg:w-8/12 xxl:w-1/2">
          <form data-testid="self-registration-form" onSubmit={handleSubmit}>
            <div className="block md:flex md:gap-3">
              <FormInput
                isRequired
                isInvalid={athleteDataError?.nameError}
                color={athleteDataError?.nameError ? "danger" : "default"}
                errorMessage={
                  athleteDataError?.nameError
                    ? "Por favor ingresa un nombre válido"
                    : ""
                }
                type="text"
                label="Nombres"
                size="lg"
                onChange={(value) => setField("athleteName", value)}
              />
              <FormInput
                isRequired
                isInvalid={athleteDataError?.lastNameError}
                color={athleteDataError?.lastNameError ? "danger" : "default"}
                errorMessage={
                  athleteDataError?.lastNameError
                    ? "Por favor ingresa un apellido válido"
                    : ""
                }
                type="text"
                label="Apellidos"
                size="lg"
                customInputClass="mt-7 md:mt-0"
                onChange={(value) => setField("athleteLastName", value)}
              />
            </div>
            <div className="block md:flex md:gap-3">
              <FormInput
                isRequired
                isInvalid={athleteDataError?.documentIDError}
                color={athleteDataError?.documentIDError ? "danger" : "default"}
                errorMessage={
                  athleteDataError?.documentIDError
                    ? "Por favor ingresa un número de teléfono válido"
                    : ""
                }
                type="text"
                label="Número de documento"
                size="lg"
                customInputClass="mt-7"
                onChange={(value) => setField("documentID", value)}
              />
              <FormInput
                isRequired
                isInvalid={athleteDataError?.phoneNumberError}
                color={
                  athleteDataError?.phoneNumberError ? "danger" : "default"
                }
                errorMessage={
                  athleteDataError?.phoneNumberError
                    ? "Por favor ingresa un número de teléfono válido"
                    : ""
                }
                type="text"
                label="Número de teléfono"
                size="lg"
                customInputClass="mt-7"
                onChange={(value) => setField("phoneNumber", value)}
              />
            </div>
            <FormInput
              isRequired
              isInvalid={athleteDataError?.emailError}
              color={athleteDataError?.emailError ? "danger" : "default"}
              errorMessage={
                athleteDataError?.emailError
                  ? "Por favor ingresa un correo electrónico válido"
                  : ""
              }
              type="email"
              label="Correo electrónico"
              size="lg"
              customInputClass="mt-7"
              onChange={(value) => setField("email", value)}
            />
            <FormInput
              isRequired
              isInvalid={athleteDataError?.birthDateError}
              color={athleteDataError?.birthDateError ? "danger" : "default"}
              errorMessage={
                athleteDataError?.birthDateError
                  ? "Por favor ingresa una fecha válida"
                  : ""
              }
              type="date"
              label="Fecha de nacimiento"
              placeholder="Fecha de nacimiento"
              size="lg"
              customInputClass="mt-5"
              onChange={(value) => setField("birthDate", value)}
            />
            <FormRadioButton
              label="Selecciona el genero del deportista"
              isInvalid={athleteDataError?.genreError}
              customClass="mt-5"
              onChange={(value) => setField("genre", value)}
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

      <CustomModal
        isOpen={toogleModal}
        onOpenChange={setToogleModal}
        size="2xl"
        content={
          <div className="flex flex-col items-center">
            <CheckIcon />

            <h2 className="text-2xl font-bold text-center mt-2">
              ¡Tu registro fue exitoso!
            </h2>

            <p className="text-center text-gray-600 mt-3 mb-6">
              Descarga nuestra app y lleva el control de tus entrenamientos
              donde sea.
            </p>

            <div className="flex justify-center gap-4">
              <button
                className="flex flex-col md:flex-row items-center justify-center bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md text-sm font-medium"
                onClick={() => window.open("https://play.google.com/store/apps/details?id=com.fithub.fithubconnectplusmobile&hl=es_CO", "_blank")}
              >
                <AndroidIcon />
                <span className="ml-1">Descargar para Android</span>
              </button>

              <button
                className="flex flex-col md:flex-row items-center justify-center bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md text-sm font-medium"
                onClick={() => window.open("https://apps.apple.com/co/app/fithub-connect-plus/id6736966985", "_blank")}
              >
                <IOSIcon />
                <span className="ml-1">Descargar para iOS</span>
              </button>
            </div>
          </div>
        }
        footerContent={
          <div className="flex justify-center gap-4 mt-2">
            <Button
              color="primary"
              variant="ghost"
              onPress={handleDownloadApp}
            >
              Descargar App
            </Button>
            <Button
              color="secondary"
              variant="ghost"
              onPress={() => (window.location.href = "/")}
            >
              Cerrar
            </Button>
          </div>
        }
      />

      <InfoModal
        isOpen={errorModal}
        onOpenChange={setErrorModal}
        message={errorMessage}
      />
    </>
  );
};

export default SelfRegistration;
