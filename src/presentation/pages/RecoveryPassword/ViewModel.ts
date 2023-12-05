import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { RecoverPasswordUseCase } from "@/domain/useCases/GymUser/recoverPasswordUseCase";
import { isValidEmail } from "@/presentation/helpers";
import { IRecoversPasswordValidation } from "@/presentation/interfaces/IAuth";
import { useState } from "react";

const ViewModel = () => {
  const [email, setEmail] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<boolean>(false);

  const handleIsValidForm = () => {
    const errors: IRecoversPasswordValidation = {
      emailError: !isValidEmail(email),
    };

    setEmailError(errors.emailError);

    return Promise.resolve(errors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const errors = await handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      const recoverPasswordUseCase = container.get<RecoverPasswordUseCase>(
        TYPES.RecoverPasswordUseCase
      );

      const response = await recoverPasswordUseCase.execute(email);

      if (!response) {
        console.log("error");
      }

      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return {
    handleEmail,
    handleSubmit,
    toggleModal,
    isModalOpen,
    emailError,
  };
};

export default ViewModel;
