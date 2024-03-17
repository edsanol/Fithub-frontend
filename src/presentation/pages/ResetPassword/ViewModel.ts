import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { ResetPassword } from "@/domain/models/ResetPassword";
import { ResetPasswordUseCase } from "@/domain/useCases/GymUser/resetPasswordUseCase";
import {
  isNotEmpty,
  isValidNewPassword,
  isValidPassword,
} from "@/presentation/helpers";
import { IResetPasswordValidation } from "@/presentation/interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ViewModel = () => {
  const router = useRouter();
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

      const resetPasswordUseCase = container.get<ResetPasswordUseCase>(
        TYPES.ResetPasswordUseCase
      );

      const response = await resetPasswordUseCase.execute(resetPasswordData);

      if (!response) {
        console.log("error");
        return;
      }

      router.push("/login");
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
