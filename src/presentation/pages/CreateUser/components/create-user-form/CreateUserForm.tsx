"use client";

import {
  FormInput,
  FormRadioButton,
  FormSelect,
  InfoModal,
  PrimaryButton,
} from "@/presentation/components";
import React from "react";
import ViewModel from "./ViewModel";
import { formatMembershipElements } from "@/presentation/helpers";
import { genres } from "@/assets/constants";

const CreateUserForm = () => {
  const {
    handleSubmit,
    setField,
    setErrorModal,
    athleteIdValue,
    athleteData,
    athleteDataError,
    membership,
    errorModal,
    errorMessage,
  } = ViewModel();

  return (
    <>
      <form data-testid="create-user-id" onSubmit={handleSubmit}>
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
          isReadOnly={athleteIdValue ? true : false}
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
            <div className="md:flex gap-1">
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
              <FormInput
                isRequired
                isInvalid={athleteDataError?.startMembershipDateError}
                color={athleteDataError?.startMembershipDateError ? "danger" : "default"}
                errorMessage={
                  athleteDataError?.startMembershipDateError
                    ? "Por favor ingresa una fecha válida"
                    : ""
                }
                type="date"
                label="Inicio de membresía (dd/mm/aaaa)"
                placeholder="Fecha de inicio de membresía"
                size="lg"
                customInputClass="mt-5"
                onChange={(value) => setField("startMembershipDate", value)}
                value={athleteData?.startMembershipDate}
              />
            </div>
          </>
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
