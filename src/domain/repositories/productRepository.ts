import { Product } from "../entities/Product";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface ProductRepository {
  registerProduct(product: Product): Promise<boolean>;
  getProductList(data: PaginateData): Promise<PaginateResponseList<Product>>;
}
