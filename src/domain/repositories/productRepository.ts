import { Product } from "../entities/Product";

export interface ProductRepository {
  registerProduct(product: Product): Promise<boolean>;
}
