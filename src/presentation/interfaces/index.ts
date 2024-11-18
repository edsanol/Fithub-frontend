import { IAthleteValidation } from "./Athlete/IAthlete";
import {
  IGymDataValidation,
  IChangePasswordValidation,
  IRecoverPasswordValidation,
  IResetPasswordValidation,
} from "./Auth/IAuth";
import { IColumns } from "./CustomTable/ICustomTable";
import { IDiscountValidation } from "./Discounts/IDiscounts";
import { IMembershipValidation } from "./Membership/IMembership";
import { IMeasurementProgressValidation } from "./UserProgress/IUserProgress";
import {
  IProductValidation,
  IStockMovementValidation,
} from "./Product/IProduct";
import { ICategoryValidation } from "./Category/ICategory";

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
  ICategoryValidation,
  IProductValidation,
  IStockMovementValidation,
};
