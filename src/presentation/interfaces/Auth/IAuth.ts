export interface IGymDataValidation {
  gymNameError: boolean;
  emailError: boolean;
  passwordError?: boolean;
  addressError: boolean;
  phoneNumberError: boolean;
  nitError: boolean;
}

export interface IChangePasswordValidation {
  emailError: boolean;
  passwordError: boolean;
  newPasswordError: boolean;
  confirmPasswordError: boolean;
}

export interface IRecoverPasswordValidation {
  emailError: boolean;
}

export interface IResetPasswordValidation {
  tokenError: boolean;
  newPasswordError: boolean;
  confirmPasswordError: boolean;
}
