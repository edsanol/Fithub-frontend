"use client";

import EditIcon from "@/assets/svg/EditIcon";
import {
  CustomModal,
  FormInput,
  FormLink,
  FormMultiSelect,
  FormTextarea,
  InfoModal,
  PrimaryButton,
} from "@/presentation/components";
import { Button } from "@nextui-org/react";
import ViewModel from "./ViewModel";
import { formatAccessTypes } from "@/presentation/helpers";
import QRIcon from "@/assets/svg/QRIcon";
import { QRCodeCanvas } from "qrcode.react";

const GymProfileForm = () => {
  const {
    handleSubmit,
    setField,
    handleClick,
    setErrorModal,
    setFieldAccessTypes,
    setToogleModal,
    handleDownloadQR,
    handleShareQR,
    idGym,
    qrRef,
    toogleModal,
    isClicked,
    gymUserData,
    gymUserDataError,
    errorMessage,
    errorModal,
    accessTypes,
    formattedAccessTypes,
  } = ViewModel();

  return (
    <>
      <div className="w-full flex justify-end mt-3">
        <Button
          color={isClicked ? "danger" : "primary"}
          variant="ghost"
          startContent={<EditIcon />}
          size="lg"
          onClick={handleClick}
          className="mr-3"
        >
          {isClicked ? "Cancelar" : "Editar"}
        </Button>

        <Button
          color="secondary"
          startContent={<QRIcon />}
          size="lg"
          onPress={() => setToogleModal(true)}
        >
          QR
        </Button>
      </div>

      <form
        data-testid="gym-profile-form-id"
        className="mt-5"
        onSubmit={handleSubmit}
      >
        <div className="block md:flex md:gap-3">
          <FormInput
            isRequired
            isReadOnly={!isClicked}
            isInvalid={gymUserDataError?.gymNameError}
            color={gymUserDataError?.gymNameError ? "danger" : "default"}
            errorMessage={
              gymUserDataError?.gymNameError
                ? "Por favor ingresa un nombre válido"
                : ""
            }
            type="text"
            label="Nombre"
            size="lg"
            value={gymUserData?.gymName}
            onChange={(value) => setField("gymName", value)}
          />
          <FormInput
            isRequired
            isReadOnly={!isClicked}
            isInvalid={gymUserDataError?.addressError}
            color={gymUserDataError?.addressError ? "danger" : "default"}
            errorMessage={
              gymUserDataError?.addressError
                ? "Por favor ingresa una dirección válida"
                : ""
            }
            type="text"
            label="Dirección"
            size="lg"
            customInputClass="mt-5 md:mt-0"
            value={gymUserData?.address}
            onChange={(value) => setField("address", value)}
          />
        </div>
        <div className="block md:flex md:gap-3">
          <FormInput
            isRequired
            isReadOnly={!isClicked}
            isInvalid={gymUserDataError?.nitError}
            color={gymUserDataError?.nitError ? "danger" : "default"}
            errorMessage={
              gymUserDataError?.nitError
                ? "Por favor ingresa un NIT válido"
                : ""
            }
            type="text"
            label="NIT o razón social"
            size="lg"
            customInputClass="mt-5"
            value={gymUserData?.nit}
            onChange={(value) => setField("nit", value)}
          />
          <FormInput
            isRequired
            isReadOnly={!isClicked}
            isInvalid={gymUserDataError?.phoneNumberError}
            color={gymUserDataError?.phoneNumberError ? "danger" : "default"}
            errorMessage={
              gymUserDataError?.phoneNumberError
                ? "Por favor ingresa un número de teléfono válido"
                : ""
            }
            type="text"
            label="Número de teléfono"
            size="lg"
            customInputClass="mt-5"
            value={gymUserData?.phoneNumber}
            onChange={(value) => setField("phoneNumber", value)}
          />
        </div>
        <FormInput
          isRequired
          isReadOnly
          isInvalid={gymUserDataError?.emailError}
          color={gymUserDataError?.emailError ? "danger" : "default"}
          errorMessage={
            gymUserDataError?.emailError
              ? "Por favor ingresa un correo electrónico válido"
              : ""
          }
          type="email"
          label="Correo electrónico"
          size="lg"
          customInputClass="mt-5"
          value={gymUserData?.email}
          onChange={(value) => setField("email", value)}
        />
        <div className="hidden mt-5">
          <FormInput
            isRequired
            isReadOnly
            type="text"
            label="Membresías"
            size="lg"
            customInputClass="mt-5"
            value={gymUserData?.subscriptionPlan}
          />
        </div>
        <FormMultiSelect
          isRequired
          isDisabled={!isClicked}
          label="Tipos de acceso"
          placeholder="Selecciona los tipos de acceso, puedes seleccionar mas de uno"
          size="lg"
          items={formatAccessTypes(accessTypes)}
          customInputClass="mt-5"
          value={formattedAccessTypes}
          onChange={(values) => setFieldAccessTypes(values)}
        />
        <div className="mt-5">
          <FormTextarea
            isReadOnly={!isClicked}
            value={gymUserData?.comments}
            label="Comentarios adicionales"
            placeholder="Escribe tus comentarios"
            size="lg"
            onChange={(value) => setField("comments", value)}
          />
        </div>
        <PrimaryButton
          text="Guardar cambios"
          btnType="submit"
          customButtonClass={"mt-5 w-full p-8" + (!isClicked ? " hidden" : "")}
        />
        <FormLink
          href="/change-password"
          text="Cambiar contraseña"
          customLinkClass="mt-3"
        />
      </form>

      <CustomModal
        isOpen={toogleModal}
        onOpenChange={setToogleModal}
        size="2xl"
        content={
          <>
            <div className="mt-3 flex flex-col justify-center">
              <div
                ref={qrRef}
                className="mx-auto w-[fit-content] h-auto border-2 bg-white border-gray-200 p-5 rounded-lg flex flex-col items-center justify-center"
              >
                <QRCodeCanvas
                  value={`http://localhost:3000/self-registration/${idGym}`}
                  size={200}
                  level="H"
                />
              </div>
              <p className="text-lg text-center mt-5">
                Comparte este código QR para que tus deportistas se registren fácilmente en tu gimnasio.
              </p>
              <p className="text-sm text-center text-default-400">
                Descárgalo o compártelo directamente desde tu dispositivo.
              </p>
            </div>
          </>
        }
        footerContent={
          <>
            <Button color="primary" variant="ghost" onPress={handleDownloadQR}>
              Descargar QR
            </Button>
            <Button color="secondary" variant="ghost" onPress={handleShareQR}>
              Compartir QR
            </Button>
          </>
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

export default GymProfileForm;
