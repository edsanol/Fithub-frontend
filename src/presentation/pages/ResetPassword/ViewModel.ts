import { ResetPassword } from "@/domain/models/ResetPassword";
import {
  isNotEmpty,
  isValidNewPassword,
  isValidPassword,
} from "@/presentation/helpers";
import { IResetPasswordValidation } from "@/presentation/interfaces/IAuth";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ViewModel = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [resetPasswordData, setResetPasswordData] = useState<ResetPassword>({
    token: token || "",
    newPassword: "",
    confirmPassword: "",
  });

  const [resetPasswordDataError, setResetPasswordDataError] =
    useState<IResetPasswordValidation>({
      tokenError: false,
      newPasswordError: false,
      confirmPasswordError: false,
    });

  const handleIsValidForm = () => {
    const errors: IResetPasswordValidation = {
      tokenError: !isNotEmpty(resetPasswordData.token!),
      newPasswordError: !isValidPassword(resetPasswordData.newPassword!),
      confirmPasswordError: !isValidNewPassword(
        resetPasswordData.newPassword!,
        resetPasswordData.confirmPassword!
      ),
    };

    setResetPasswordDataError(errors);

    return Promise.resolve(errors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const errors = await handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      console.log(resetPasswordData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetNewPassword = (event: string) => {
    setResetPasswordData({
      ...resetPasswordData,
      newPassword: event,
    });
  };

  const handleSetConfirmPassword = (event: string) => {
    setResetPasswordData({
      ...resetPasswordData,
      confirmPassword: event,
    });
  };

  return {
    resetPasswordData,
    resetPasswordDataError,
    handleSubmit,
    handleSetNewPassword,
    handleSetConfirmPassword,
  };
};

export default ViewModel;
