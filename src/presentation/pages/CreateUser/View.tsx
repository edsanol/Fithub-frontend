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
    athleteDataError,
  } = ViewModel();

  return (
    <>
      <div className="h-full bg-[#000]">
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
            />
            <FormInput
              isRequired
              isInvalid={athleteDataError?.birthDateError}
              color={athleteDataError?.birthDateError ? "danger" : "default"}
              errorMessage={
                athleteDataError?.birthDateError
                  ? "Por favor ingresa un nombre válido"
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
            />
            <FormRadioButton
              label="Selecciona el genero del deportista"
              isInvalid={athleteDataError?.genreError}
              customClass="mt-5"
              options={genres}
              onChange={(value) => handleSetGenre(value)}
            />
            <PrimaryButton
              text="Crear deportista"
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
