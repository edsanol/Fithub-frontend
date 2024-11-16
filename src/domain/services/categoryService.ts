import { Category } from "../entities/Category";

export interface CategoryService {
  registerCategory(category: Category): Promise<boolean>;
  getCategoryList(): Promise<Category[]>;
}
