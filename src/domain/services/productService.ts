import { Product } from "../entities/Product";

export interface ProductService {
  registerProduct(product: Product): Promise<boolean>;
}
