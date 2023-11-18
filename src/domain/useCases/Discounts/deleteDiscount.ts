import { injectable, inject } from "inversify";
import type { DiscountsRepository } from "../../repositories/discountsRepository";
import { TYPES } from "@/config/types";

@injectable()
export class DeleteDiscountUseCase {
  constructor(
    @inject(TYPES.DiscountsRepository)
    private discountsRepository: DiscountsRepository
  ) {}

  async execute(id: number): Promise<boolean> {
    return await this.discountsRepository.deleteDiscount(id);
  }
}
