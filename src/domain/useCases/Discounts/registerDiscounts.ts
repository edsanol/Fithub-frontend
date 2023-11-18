import { injectable, inject } from "inversify";
import type { DiscountsRepository } from "../../repositories/discountsRepository";
import { Discounts } from "@/domain/entities/Discounts";
import { TYPES } from "@/config/types";

@injectable()
export class RegisterDiscountUseCase {
  constructor(
    @inject(TYPES.DiscountsRepository)
    private discountsRepository: DiscountsRepository
  ) {}

  async execute(discount: Discounts): Promise<boolean> {
    return await this.discountsRepository.registerDiscount(discount);
  }
}
