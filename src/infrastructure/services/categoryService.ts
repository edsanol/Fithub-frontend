import { injectable, inject } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { TickerResponseApi } from "../api/model/TickerResponseApi";
import { CategoryService } from "@/domain/services/categoryService";
import { Category } from "@/domain/entities/Category";

@injectable()
export class CategoryServiceImpl implements CategoryService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }

  async registerCategory(category: Category): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, Category>(
      "/InventoryProducts/RegisterCategoryProduct",
      category
    );

    return response.data;
  }

  async getCategoryList(): Promise<Category[]> {
    const response = await this.http.get<TickerResponseApi<Category[]>>(
      "/InventoryProducts/GetAllCategoriesProducts"
    );

    return response.data;
  }
}
