import { injectable, inject } from "inversify";
import type { DiscountsRepository } from "../../repositories/discountsRepository";
import { Discounts } from "@/domain/entities/Discounts";
import { TYPES } from "@/config/types";

@injectable()
export class GetDiscountByIdUseCase {
  constructor(
    @inject(TYPES.DiscountsRepository)
    private discountsRepository: DiscountsRepository
  ) {}

  async execute(id: number): Promise<Discounts> {
    return await this.discountsRepository.getDiscountById(id);
  }
}
