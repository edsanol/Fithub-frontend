import { Discounts } from "../entities/Discounts";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface DiscountsRepository {
  registerDiscount(discount: Discounts): Promise<boolean>;
  getDiscountsList(
    data: PaginateData
  ): Promise<PaginateResponseList<Discounts>>;
  getDiscountById(id: number): Promise<Discounts>;
  editDiscount(id: number, discount: Discounts): Promise<boolean>;
  deleteDiscount(id: number): Promise<boolean>;
}
