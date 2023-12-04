import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { ResetPassword } from "@/domain/models/ResetPassword";
import { ChangePasswordUseCase } from "@/domain/useCases/GymUser/changePasswordUseCase";
import {
  isValidChangePassword,
  isValidEmail,
  isValidNewPassword,
  isValidPassword,
} from "@/presentation/helpers";
import { IChangePasswordValidation } from "@/presentation/interfaces/IAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ViewModel = () => {
  const router = useRouter();

  const [changePasswordData, setChangePasswordData] = useState<ResetPassword>({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changePasswordDataError, setChangePasswordDataError] =
    useState<IChangePasswordValidation>({
      emailError: false,
      passwordError: false,
      newPasswordError: false,
      confirmPasswordError: false,
    });

  const handleIsValidForm = () => {
    const errors: IChangePasswordValidation = {
      emailError: !isValidEmail(changePasswordData.email!),
      passwordError: !isValidPassword(changePasswordData.oldPassword!),
      newPasswordError: !isValidChangePassword(
        changePasswordData.oldPassword!,
        changePasswordData.newPassword!
      ),
      confirmPasswordError: !isValidNewPassword(
        changePasswordData.newPassword!,
        changePasswordData.confirmPassword!
      ),
    };

    setChangePasswordDataError(errors);

    return Promise.resolve(errors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const errors = await handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      const changePasswordUseCase = container.get<ChangePasswordUseCase>(
        TYPES.ChangePasswordUseCase
      );

      const response = await changePasswordUseCase.execute(changePasswordData);

      if (!response) {
        console.log("error");
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetEmail = (event: string) => {
    setChangePasswordData({ ...changePasswordData, email: event });
  };

  const handleSetPassword = (event: string) => {
    setChangePasswordData({ ...changePasswordData, oldPassword: event });
  };

  const handleSetNewPassword = (event: string) => {
    setChangePasswordData({ ...changePasswordData, newPassword: event });
  };

  const handleSetConfirmPassword = (event: string) => {
    setChangePasswordData({ ...changePasswordData, confirmPassword: event });
  };

  return {
    changePasswordDataError,
    handleSubmit,
    handleSetEmail,
    handleSetPassword,
    handleSetNewPassword,
    handleSetConfirmPassword,
  };
};

export default ViewModel;
