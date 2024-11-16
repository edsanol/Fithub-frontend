import { TYPES } from "@/config/types";
import { Product } from "@/domain/entities/Product";
import type { ProductRepository } from "@/domain/repositories/productRepository";
import { inject, injectable } from "inversify";

@injectable()
export class RegisterProductUseCase {
  constructor(
    @inject(TYPES.ProductRepository)
    private productRepository: ProductRepository
  ) {}

  async execute(product: Product): Promise<boolean> {
    return await this.productRepository.registerProduct(product);
  }
}
