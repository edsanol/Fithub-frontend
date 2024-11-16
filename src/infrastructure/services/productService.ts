import { injectable, inject } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { TickerResponseApi } from "../api/model/TickerResponseApi";
import { ProductService } from "@/domain/services/productService";
import { Product } from "@/domain/entities/Product";

@injectable()
export class ProductServiceImpl implements ProductService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }
  async registerProduct(product: Product): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, Product>(
      "/InventoryProducts/RegisterProduct",
      product
    );

    return response.data;
  }
}
