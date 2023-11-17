"use client";

import { genres } from "@/assets/constants";
import {
  FormInput,
  FormRadioButton,
  PrimaryButton,
} from "@/presentation/components";
import React from "react";
import ViewModel from "./ViewModel";

const CreateUser = () => {
  const {
    handleSubmit,
    handleSetName,
    handleSetLastName,
    handleSetEmail,
    handleSetPhoneNumber,
    handleSetBirthDate,
    handleSetGenre,
    athleteIdValue,
    athleteData,
    athleteDataError,
  } = ViewModel();

  return (
    <>
      <div className="h-full bg-[#000]">
        <h1 className="w-full flex justify-center font-black text-3xl mb-8">
          {athleteIdValue ? "Editar deportista" : "Crear deportista"}
        </h1>
        <div className="w-full mx-auto bg-[#121417] rounded-xl p-5 md:p-10 xl:w-9/12">
          <form onSubmit={handleSubmit}>
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
                classNames={{ base: "dark" }}
                onChange={(value) => handleSetName(value)}
                value={athleteData?.athleteName}
              />
              <FormInput
                isRequired
                isInvalid={athleteDataError?.nameError}
                color={athleteDataError?.nameError ? "danger" : "default"}
                errorMessage={
                  athleteDataError?.nameError
                    ? "Por favor ingresa un apellido válido"
                    : ""
                }
                type="text"
                label="Apellidos"
                size="lg"
                classNames={{ base: "dark" }}
                customInputClass="mt-7 md:mt-0"
                onChange={(value) => handleSetLastName(value)}
                value={athleteData?.athleteLastName}
              />
            </div>
            <FormInput
              isRequired
              isInvalid={athleteDataError?.phoneNumberError}
              color={athleteDataError?.phoneNumberError ? "danger" : "default"}
              errorMessage={
                athleteDataError?.phoneNumberError
                  ? "Por favor ingresa un número de teléfono válido"
                  : ""
              }
              type="text"
              label="Número de teléfono"
              size="lg"
              classNames={{ base: "dark" }}
              customInputClass="mt-7"
              onChange={(value) => handleSetPhoneNumber(value)}
              value={athleteData?.phoneNumber}
            />
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
              classNames={{ base: "dark" }}
              customInputClass="mt-7"
              onChange={(value) => handleSetEmail(value)}
              value={athleteData?.email}
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
              labelPlacement="outside"
              size="lg"
              classNames={{ base: "dark" }}
              customInputClass="mt-5"
              onChange={(value) => handleSetBirthDate(value)}
              value={athleteData?.birthDate.slice(0, 10)}
            />
            <FormRadioButton
              label="Selecciona el genero del deportista"
              isInvalid={athleteDataError?.genreError}
              customClass="mt-5"
              onChange={(value) => handleSetGenre(value)}
              options={genres}
              value={athleteData?.genre}
            />
            <PrimaryButton
              text="Guardar"
              btnType="submit"
              customButtonClass="mt-8 w-full p-8"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
