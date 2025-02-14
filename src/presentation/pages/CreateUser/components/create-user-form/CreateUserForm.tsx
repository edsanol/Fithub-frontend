"use client";

import {
  FormCheckbox,
  FormInput,
  FormSelect,
  InfoModal,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import { formatMembershipElements } from "@/presentation/helpers";
import { genres } from "@/assets/constants";

const CreateUserForm = () => {
  const {
    handleSubmit,
    setField,
    setErrorModal,
    toogleCheckboxes,
    athleteIdValue,
    athleteData,
    athleteDataError,
    membership,
    errorModal,
    errorMessage,
    paymentEnabled,
    discountEnabled,
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
            value={athleteData?.documentID}
          />
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
          value={athleteData?.email}
        />

        <div className="md:flex md:gap-3">
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
          <FormSelect
            isRequired
            label="Género"
            placeholder="Selecciona un género"
            size="lg"
            popoverProps={{ color: "foreground" }}
            items={genres}
            onChange={(value) => setField("genre", value)}
            customInputClass="mt-5"
            value={athleteData?.genre}
          />
        </div>

        {!athleteIdValue && (
          <div className="mt-3">
            <h3 className="text-lg font-semibold mb-3">
              Información de la membresía
            </h3>

            <div className="md:flex gap-3">
              <FormSelect
                isRequired
                label="Membresía"
                placeholder="Selecciona un plan"
                size="lg"
                popoverProps={{ color: "foreground" }}
                items={formatMembershipElements(membership)}
                onChange={(value) => setField("membershipId", Number(value))}
                customInputClass="mt-5 md:mt-0"
                value={String(athleteData?.membershipId) || ""}
              />
              <FormInput
                isRequired
                isInvalid={athleteDataError?.startMembershipDateError}
                color={
                  athleteDataError?.startMembershipDateError
                    ? "danger"
                    : "default"
                }
                errorMessage={
                  athleteDataError?.startMembershipDateError
                    ? "Por favor ingresa una fecha válida"
                    : ""
                }
                type="date"
                label="Inicio de membresía"
                placeholder="Fecha de inicio de membresía"
                size="lg"
                customInputClass="mt-5 md:mt-0"
                onChange={(value) => setField("startMembershipDate", value)}
                value={athleteData?.startMembershipDate}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
              <div>
                <FormCheckbox
                  customClassNames="mt-2"
                  label="¿Pago por abono?"
                  selected={paymentEnabled}
                  onValueChange={() => toogleCheckboxes("payment")}
                />

                {paymentEnabled && (
                  <div className="mt-3">
                    <FormInput
                      type="number"
                      label="Monto Abonado"
                      placeholder="Ej: 50000"
                      size="lg"
                      onChange={(value) => setField("paymentAmount", Number(value))}
                    />
                  </div>
                )}
              </div>

              <div>
                <FormCheckbox
                  customClassNames="mt-2"
                  label="¿Aplicar descuento?"
                  selected={discountEnabled}
                  onValueChange={() => toogleCheckboxes("discount")}
                />

                {discountEnabled && (
                  <div className="mt-3">
                    <FormInput
                      type="number"
                      label="Valor del descuento"
                      placeholder="Ej: 20000"
                      size="lg"
                      onChange={(value) => setField("discount", Number(value))}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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
