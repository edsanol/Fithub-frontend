"use client";

import {
  FormCheckbox,
  FormInput,
  FormRadioButton,
  FormSelect,
  InfoModal,
  PrimaryButton,
} from "@/presentation/components";
import React from "react";
import AccessCodeInput from "../access-code-input/AccessCodeInput";
import ViewModel from "./ViewModel";
import { formatMembershipElements } from "@/presentation/helpers";
import { genres } from "@/assets/constants";

const CreateUserForm = () => {
  const {
    handleSubmit,
    setField,
    setCheck,
    setErrorModal,
    athleteIdValue,
    athleteData,
    athleteDataError,
    membership,
    isCheck,
    errorModal,
    errorMessage,
  } = ViewModel();

  return (
    <>
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
            onChange={(value) => setField("athleteName", value)}
            value={athleteData?.athleteName}
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
          customInputClass="mt-7"
          onChange={(value) => setField("phoneNumber", value)}
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
          customInputClass="mt-7"
          onChange={(value) => setField("email", value)}
          value={athleteData?.email}
        />
        {!athleteIdValue && (
          <>
            <AccessCodeInput
              athleteData={athleteData}
              athleteDataError={athleteDataError}
              handleSetCardAccessCode={(value) =>
                setField("cardAccessCode", value)
              }
            />
            <FormSelect
              isRequired
              label="Membresías"
              placeholder="Selecciona un plan"
              size="lg"
              popoverProps={{ color: "foreground" }}
              items={formatMembershipElements(membership)}
              onChange={(value) => setField("membershipId", Number(value))}
              customInputClass="mt-5"
              value={athleteData?.membershipId}
            />
          </>
        )}
        {athleteIdValue && (
          <FormCheckbox
            label="¿Desea editar el código de acceso del deportista?"
            selected={isCheck}
            customClassNames="mt-2"
            onValueChange={(value) => setCheck(value)}
          />
        )}
        {isCheck && (
          <AccessCodeInput
            athleteData={athleteData}
            athleteDataError={athleteDataError}
            handleSetCardAccessCode={(value) =>
              setField("cardAccessCode", value)
            }
          />
        )}
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
          customInputClass="mt-5"
          onChange={(value) => setField("birthDate", value)}
          value={athleteData?.birthDate.slice(0, 10)}
        />
        <FormRadioButton
          label="Selecciona el genero del deportista"
          isInvalid={athleteDataError?.genreError}
          customClass="mt-5"
          onChange={(value) => setField("genre", value)}
          options={genres}
          value={athleteData?.genre}
        />
        <PrimaryButton
          text="Guardar"
          btnType="submit"
          customButtonClass="mt-8 w-full p-8"
        />
      </form>

      <InfoModal
        isOpen={errorModal}
        onOpenChange={setErrorModal}
        message={errorMessage}
      />
    </>
  );
};

export default CreateUserForm;
