import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { UnsubscribeAthleteUserUseCase } from "@/domain/useCases/AthleteUser/unsubscribeAthleteUserUseCase";
import { isValidEmail } from "@/presentation/helpers";
import { IRecoverPasswordValidation } from "@/presentation/interfaces";
import { useState } from "react";

const ViewModel = () => {
  const [unsubscribeData, setUnsubscribeData] = useState<{ email: string }>({
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [erroModal, setErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleIsValidForm = () => {
    const errors: IRecoverPasswordValidation = {
      emailError: !isValidEmail(unsubscribeData.email),
    };

    setEmailError(errors.emailError);

    return Promise.resolve(errors);
  };

  const handleSubmit = async () => {
    try {
      const errors = await handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        setIsModalOpen(true);
        return;
      }

      const unsubscribe = container.get<UnsubscribeAthleteUserUseCase>(
        TYPES.UnsubscribeAthleteUserUseCase
      );

      const response = await unsubscribe.execute(unsubscribeData);

      if (!response) {
        setError("error");
        console.log("error");
        setIsModalOpen(false);
        return;
      }

      setIsModalOpen(false);
      window.location.href = "/";
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(
        error.response.data.message || "Error al eliminar la cuenta"
      );
    }
  };

  const handleEmail = (value: string) => {
    setUnsubscribeData({ ...unsubscribeData, email: value });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return {
    handleEmail,
    handleSubmit,
    toggleModal,
    setErrorModal,
    isModalOpen,
    emailError,
    erroModal,
    errorMessage,
    error,
    unsubscribeData,
  };
};

export default ViewModel;
