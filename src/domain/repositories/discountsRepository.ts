import { Discounts } from "../entities/Discounts";

export interface DiscountsRepository {
  registerDiscount(discount: Discounts): Promise<boolean>;
}
