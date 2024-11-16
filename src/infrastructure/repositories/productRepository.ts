import { TYPES } from "@/config/types";
import { Product } from "@/domain/entities/Product";
import { ProductRepository } from "@/domain/repositories/productRepository";
import type { ProductService } from "@/domain/services/productService";
import { inject, injectable } from "inversify";

@injectable()
export class ProductRepositoryImpl implements ProductRepository {
  private readonly service: ProductService;

  constructor(@inject(TYPES.ProductService) service: ProductService) {
    this.service = service;
  }

  async registerProduct(product: Product): Promise<boolean> {
    const response = await this.service.registerProduct(product);

    return response;
  }
}
