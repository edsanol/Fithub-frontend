import {
  cardCodeRegex,
  emailRegex,
  measurementRegex,
  nameRegex,
  nitRegex,
  notEmptyRegex,
  numberRegex,
  passwordRegex,
  phoneRegex,
} from "@/presentation/interfaces/regex";

export const isValidEmail = (email: string): boolean => {
  if (emailRegex.test(email)) {
    return true;
  }
  return false;
};

export const isValidNit = (nit: string): boolean => {
  if (nitRegex.test(nit)) {
    return true;
  }

  return false;
};

export const isValidPassword = (password: string): boolean => {
  if (passwordRegex.test(password)) {
    return true;
  }

  return false;
};

export const isValidName = (name: string): boolean => {
  if (nameRegex.test(name)) {
    return true;
  }

  return false;
};

export const isValidCardCode = (cardCode: string): boolean => {
  if (cardCodeRegex.test(cardCode)) {
    return true;
  }

  return false;
};

export const isValidPhone = (phone: string): boolean => {
  if (phoneRegex.test(phone)) {
    return true;
  }

  return false;
};

export const isNotEmpty = (value: string): boolean => {
  if (notEmptyRegex.test(value)) {
    return true;
  }

  return false;
};

export const isValidGenre = (genre: string): boolean => {
  if (genre === "M" || genre === "F") {
    return true;
  }

  return false;
};

export const isValidNumber = (number: string): boolean => {
  if (numberRegex.test(number)) {
    return true;
  }

  return false;
};

export const isValidChangePassword = (oldPassword: string, newPassword: string): boolean => {
  if (oldPassword === newPassword) {
    return false;
  }

  return true;
};

export const isValidNewPassword = (newPassword: string, confirmPassword: string): boolean => {
  if (newPassword === confirmPassword) {
    return true;
  }

  return false;
};

export const isValidMeasurement = (value: number): boolean => {
  if (measurementRegex.test(value.toString())) {
    return true;
  }

  return false;
}
