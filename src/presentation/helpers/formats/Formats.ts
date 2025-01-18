import { Exercise } from "@/domain/entities/Exercise";
import { Routine } from "@/domain/entities/Routine";
import { AccessTypes } from "@/domain/models/AccessTypes";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";

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

export const formatAccessTypes = (accessTypes: AccessTypes[]) => {
  return accessTypes.map((accessType) => ({
    value: accessType.accessTypeID,
    label: accessType.accessTypeName,
  }));
};

export const formatExercises = (exercises: Exercise[]) => {
  return exercises.map((exercise) => ({
    name: exercise.exerciseTitle!,
    value: exercise.exerciseId!.toString(),
    href: exercise.imageURL,
    description: exercise.exerciseDescription!,
    label: exercise.muscleGroupName!,
  }));
};

export const formatRoutines = (routines: Routine[]) => {
  return routines.map((routine) => ({
    name: routine.title,
    value: routine.routineId!.toString(),
    href: routine.imageURL,
    description: routine.description,
    label: routine.muscleGroupName!,
  }));
};
