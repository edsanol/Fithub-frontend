import { injectable, inject } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { TickerResponseApi } from "../api/model/TickerResponseApi";
import { ProductService } from "@/domain/services/productService";
import { Product } from "@/domain/entities/Product";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { StockMovements } from "@/domain/models/StockMovements";

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

  async getProductList(
    data: PaginateData
  ): Promise<PaginateResponseList<Product>> {
    const response = await this.http.post<
      TickerResponseApi<PaginateResponseList<Product>>,
      PaginateData
    >("/InventoryProducts/GetAllProducts", data);

    return response.data;
  }

  async stockProductMovements(data: StockMovements): Promise<boolean> {
    const response = await this.http.post<
      TickerResponseApi<boolean>,
      StockMovements
    >("/InventoryProducts/RegisterEntryAndExitProduct", data);

    return response.data;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const response = await this.http.put<TickerResponseApi<boolean>, null>(
      `/InventoryProducts/DeleteProduct/${id}`,
      null
    );

    return response.data;
  }
}
