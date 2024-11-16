import { TYPES } from "@/config/types";
import { Category } from "@/domain/entities/Category";
import { CategoryRepository } from "@/domain/repositories/categoryRepository";
import type { CategoryService } from "@/domain/services/categoryService";
import { inject, injectable } from "inversify";

@injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  private readonly service: CategoryService;

  constructor(@inject(TYPES.CategoryService) service: CategoryService) {
    this.service = service;
  }

  async registerCategory(category: Category): Promise<boolean> {
    const response = await this.service.registerCategory(category);

    return response;
  }

  async getCategoryList(): Promise<Category[]> {
    const response = await this.service.getCategoryList();

    return response;
  }
}
