import { TYPES } from "@/config/types";
import { Product } from "@/domain/entities/Product";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { StockMovements } from "@/domain/models/StockMovements";
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

  async getProductList(
    data: PaginateData
  ): Promise<PaginateResponseList<Product>> {
    const response = await this.service.getProductList(data);

    return response;
  }

  async stockProductMovements(data: StockMovements): Promise<boolean> {
    const response = await this.service.stockProductMovements(data);

    return response;
  }
}
