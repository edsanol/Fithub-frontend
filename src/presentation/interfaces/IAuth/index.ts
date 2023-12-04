export interface IGymData {
  gymName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  registerDate: string;
  subscriptionPlan: string;
  comments: string;
  nit: string;
}

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
