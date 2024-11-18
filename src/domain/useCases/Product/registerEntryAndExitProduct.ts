import { TYPES } from "@/config/types";
import { StockMovements } from "@/domain/models/StockMovements";
import type { ProductRepository } from "@/domain/repositories/productRepository";
import { inject, injectable } from "inversify";

@injectable()
export class RegisterEntryAndExitProductUseCase {
  constructor(
    @inject(TYPES.ProductRepository)
    private productRepository: ProductRepository
  ) {}

  async execute(data: StockMovements): Promise<boolean> {
    return await this.productRepository.stockProductMovements(data);
  }
}
