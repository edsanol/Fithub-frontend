import { MembershipByGymId } from "@/domain/models/MembershipByGymId";
import {
  cardCodeRegex,
  emailRegex,
  nameRegex,
  nitRegex,
  notEmptyRegex,
  numberRegex,
  passwordRegex,
  phoneRegex,
} from "@/presentation/interfaces/regex";

import Gluteus from "@/assets/svg/Gluteus";
import Forearm from "@/assets/svg/Forearm";
import Weight from "@/assets/svg/Weight";
import Waist from "@/assets/svg/Waist";
import Biceps from "@/assets/svg/Biceps";
import Chest from "@/assets/svg/Chest";
import Height from "@/assets/svg/Height";

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

export const formatMembershipElements = (memberships: MembershipByGymId[]) => {
  return memberships.map((membership) => ({
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

export const mapperMuscleNames = (muscle: string) => {
  switch (muscle) {
    case "Gluteus":
      return "Gluteos";
    case "Biceps":
      return "Biceps";
    case "Chest":
      return "Pecho";
    case "Waist":
      return "Cintura";
    case "Thigh":
      return "Pierna";
    case "Calf":
      return "Pantorrilla";
    case "Shoulders":
      return "Espalda";
    case "Forearm":
      return "Antebrazo";
    case "Height":
      return "Estatura";
    case "Weight":
      return "Peso";
    default:
      return "Musculo";
  }
};

export const mapperMuscleIcon = (muscle: string) => {
  switch (muscle) {
    case "Gluteus":
      return Gluteus;
    case "Biceps":
      return Biceps;
    case "Chest":
      return Chest;
    case "Waist":
      return Waist;
    case "Thigh":
      return Gluteus;
    case "Calf":
      return Gluteus;
    case "Shoulders":
      return Gluteus;
    case "Forearm":
      return Forearm;
    case "Height":
      return Height;
    case "Weight":
      return Weight;
    default:
      return Gluteus;
  }
};
