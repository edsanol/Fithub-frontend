import { TYPES } from "@/config/types";
import { Product } from "@/domain/entities/Product";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import type { ProductRepository } from "@/domain/repositories/productRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetProductListUseCase {
  constructor(
    @inject(TYPES.ProductRepository)
    private productRepository: ProductRepository
  ) {}

  async execute(data: PaginateData): Promise<PaginateResponseList<Product>> {
    return await this.productRepository.getProductList(data);
  }
}
