import { TYPES } from "@/config/types";
import { Discounts } from "@/domain/entities/Discounts";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { DiscountsRepository } from "@/domain/repositories/discountsRepository";
import type { DiscountsService } from "@/domain/services/discountsService";
import { inject, injectable } from "inversify";

@injectable()
export class DiscountsRepositoryImpl implements DiscountsRepository {
  private readonly service: DiscountsService;

  constructor(@inject(TYPES.DiscountsService) service: DiscountsService) {
    this.service = service;
  }

  async registerDiscount(discount: Discounts): Promise<boolean> {
    const response = await this.service.registerDiscount(discount);

    return response;
  }

  async getDiscountsList(
    data: PaginateData
  ): Promise<PaginateResponseList<Discounts>> {
    const response = await this.service.getDiscountsList(data);

    return response;
  }
}
