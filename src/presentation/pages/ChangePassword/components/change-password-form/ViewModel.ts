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
import { IChangePasswordValidation } from "@/presentation/interfaces";
import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";

interface State {
  changePasswordData: ResetPassword;
  changePasswordDataError: IChangePasswordValidation;
}

type Action =
  | { type: "SET_FIELD"; field: keyof ResetPassword; value: string }
  | { type: "SET_ERROR"; errors: IChangePasswordValidation };

const initialState: State = {
  changePasswordData: {
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  changePasswordDataError: {
    emailError: false,
    passwordError: false,
    newPasswordError: false,
    confirmPasswordError: false,
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        changePasswordData: {
          ...state.changePasswordData,
          [action.field]: action.value,
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        changePasswordDataError: {
          ...state.changePasswordDataError,
          ...action.errors,
        },
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [{ changePasswordData, changePasswordDataError }, dispatch] =
    useReducer(reducer, initialState);

  const setField = (field: keyof ResetPassword, value: string) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

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

    dispatch({ type: "SET_ERROR", errors });
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const errors = handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      const changePasswordUseCase = container.get<ChangePasswordUseCase>(
        TYPES.ChangePasswordUseCase
      );
      const response = await changePasswordUseCase.execute(changePasswordData);

      if (!response) {
        console.log("error");
        return;
      }

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      setModalMessage(error.response.data.message);
      setModalVisible(true);
    }
  };

  return {
    changePasswordDataError,
    modalMessage,
    modalVisible,
    handleSubmit,
    setField,
    setModalVisible,
  };
};

export default ViewModel;
