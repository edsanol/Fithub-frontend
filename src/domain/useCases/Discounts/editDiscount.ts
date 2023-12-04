import { injectable, inject } from "inversify";
import type { DiscountsRepository } from "../../repositories/discountsRepository";
import { Discounts } from "@/domain/entities/Discounts";
import { TYPES } from "@/config/types";

@injectable()
export class EditDiscountUseCase {
  constructor(
    @inject(TYPES.DiscountsRepository)
    private discountsRepository: DiscountsRepository
  ) {}

  async execute(id: number, discount: Discounts): Promise<boolean> {
    return await this.discountsRepository.editDiscount(id, discount);
  }
}
