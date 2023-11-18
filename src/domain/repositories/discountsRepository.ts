import { Discounts } from "../entities/Discounts";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface DiscountsRepository {
  registerDiscount(discount: Discounts): Promise<boolean>;
  getDiscountsList(
    data: PaginateData
  ): Promise<PaginateResponseList<Discounts>>;
}
