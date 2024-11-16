import { TYPES } from "@/config/types";
import { Category } from "@/domain/entities/Category";
import type { CategoryRepository } from "@/domain/repositories/categoryRepository";
import { inject, injectable } from "inversify";

@injectable()
export class RegisterCategoryUseCase {
  constructor(
    @inject(TYPES.CategoryRepository)
    private categoryRepository: CategoryRepository
  ) {}

  async execute(category: Category): Promise<boolean> {
    return await this.categoryRepository.registerCategory(category);
  }
}
