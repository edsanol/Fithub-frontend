import { Category } from "../entities/Category";

export interface CategoryRepository {
  registerCategory(category: Category): Promise<boolean>;
  getCategoryList(): Promise<Category[]>;
}
