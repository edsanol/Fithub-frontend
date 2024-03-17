"use client";

import {
  FormInput,
  FormInputPassword,
  InfoModal,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";

const ChangePasswordForm = () => {
  const {
    changePasswordDataError,
    modalMessage,
    modalVisible,
    handleSubmit,
    setField,
    setModalVisible,
  } = ViewModel();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormInput
          isRequired
          isInvalid={changePasswordDataError?.emailError}
          color={changePasswordDataError?.emailError ? "danger" : "default"}
          errorMessage={
            changePasswordDataError?.emailError
              ? "Por favor ingresa un nombre válido"
              : ""
          }
          type="email"
          label="Correo electrónico"
          size="lg"
          onChange={(value) => setField("email", value)}
          customInputClass="mt-10"
        />
        <FormInputPassword
          isRequired
          isInvalid={changePasswordDataError?.passwordError}
          color={changePasswordDataError?.passwordError ? "danger" : "default"}
          errorMessage={
            changePasswordDataError?.passwordError
              ? "Por favor ingresa una contraseña válida"
              : ""
          }
          label="Contraseña actual"
          size="lg"
          onChange={(value) => setField("oldPassword", value)}
          customInputClass="mt-5"
        />
        <div className="block md:flex md:gap-3">
          <FormInputPassword
            isRequired
            isInvalid={changePasswordDataError?.newPasswordError}
            color={
              changePasswordDataError?.newPasswordError ? "danger" : "default"
            }
            errorMessage={
              changePasswordDataError?.newPasswordError
                ? "No puedes usar la misma contraseña"
                : ""
            }
            label="Nueva contraseña"
            size="lg"
            onChange={(value) => setField("newPassword", value)}
            customInputClass="mt-5"
          />
          <FormInputPassword
            isRequired
            isInvalid={changePasswordDataError?.confirmPasswordError}
            color={
              changePasswordDataError?.confirmPasswordError
                ? "danger"
                : "default"
            }
            errorMessage={
              changePasswordDataError?.confirmPasswordError
                ? "Las contraseñas no coinciden"
                : ""
            }
            label="Confirmar contraseña"
            size="lg"
            onChange={(value) => setField("confirmPassword", value)}
            customInputClass="mt-5"
          />
        </div>
        <PrimaryButton
          text="Cambiar contraseña"
          btnType="submit"
          customButtonClass="mt-10 w-full p-8"
        />
      </form>
      <InfoModal
        isOpen={modalVisible}
        onOpenChange={setModalVisible}
        message={modalMessage}
      />
    </>
  );
};

export default ChangePasswordForm;
