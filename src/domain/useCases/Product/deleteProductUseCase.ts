import { TYPES } from "@/config/types";
import type { ProductRepository } from "@/domain/repositories/productRepository";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteProductUseCase {
  constructor(
    @inject(TYPES.ProductRepository)
    private productRepository: ProductRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    return await this.productRepository.deleteProduct(id);
  }
}
