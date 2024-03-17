import { IAthleteValidation } from "./Athlete/IAthlete";
import { IGymDataValidation, IChangePasswordValidation, IRecoverPasswordValidation, IResetPasswordValidation } from "./Auth/IAuth";
import { IColumns } from "./CustomTable/ICustomTable";
import { IDiscountValidation } from "./Discounts/IDiscounts";
import { IMembershipValidation } from "./Membership/IMembership";
import { IMeasurementProgressValidation } from "./UserProgress/IUserProgress";

export type {
  IAthleteValidation,
  IGymDataValidation,
  IChangePasswordValidation,
  IRecoverPasswordValidation,
  IResetPasswordValidation,
  IColumns,
  IDiscountValidation,
  IMembershipValidation,
  IMeasurementProgressValidation,
};
