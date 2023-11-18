import { Discounts } from "../entities/Discounts";

export interface DiscountsService {
  registerDiscount(discount: Discounts): Promise<boolean>;
}
