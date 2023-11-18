import { Discounts } from "../entities/Discounts";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface DiscountsService {
  registerDiscount(discount: Discounts): Promise<boolean>;
  getDiscountsList(
    data: PaginateData
  ): Promise<PaginateResponseList<Discounts>>;
  getDiscountById(id: number): Promise<Discounts>;
}
