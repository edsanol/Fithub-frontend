import { injectable, inject } from "inversify";
import type { DiscountsRepository } from "../../repositories/discountsRepository";
import { Discounts } from "@/domain/entities/Discounts";
import { TYPES } from "@/config/types";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";

@injectable()
export class GetDiscountsListUseCase {
  constructor(
    @inject(TYPES.DiscountsRepository)
    private discountsRepository: DiscountsRepository
  ) {}

  async execute(data: PaginateData): Promise<PaginateResponseList<Discounts>> {
    return await this.discountsRepository.getDiscountsList(data);
  }
}
