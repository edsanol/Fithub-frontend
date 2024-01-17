import { Membership } from "@/domain/entities/Membership";
import {
  emailRegex,
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

export const isValidPassword = (password: string): boolean => {
  if (passwordRegex.test(password)) {
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

export const isValidName = (name: string): boolean => {
  if (nameRegex.test(name)) {
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

export const cleanAndFormatCurrency = (
  value: number,
  locale = "es-CO",
  currency = "COP"
) => {
  const cleanValue = value.toString().replace(/[^0-9]/g, "");

  const number = parseFloat(cleanValue);
  if (isNaN(number)) {
    return "Invalid value";
  }

  return number.toLocaleString(locale, {
    style: "currency",
    currency,
  });
};

export const formatMembershipElements = (memberships: Membership[]) => {
  // Filtrar primero las membresías con status true
  const filteredMemberships = memberships.filter(
    (membership) => membership.status === true
  );

  // Luego mapear los elementos filtrados
  return filteredMemberships.map((membership) => ({
    value: membership.membershipID,
    label: membership.membershipName,
  }));
};

export const isValidChangePassword = (
  oldPassword: string,
  newPassword: string
): boolean => {
  if (oldPassword === newPassword) {
    return false;
  }

  return true;
};

export const isValidNewPassword = (
  newPassword: string,
  confirmPassword: string
): boolean => {
  if (newPassword === confirmPassword) {
    return true;
  }

  return false;
};
