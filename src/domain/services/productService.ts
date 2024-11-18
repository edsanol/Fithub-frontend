import { Product } from "../entities/Product";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";
import { StockMovements } from "../models/StockMovements";

export interface ProductService {
  registerProduct(product: Product): Promise<boolean>;
  getProductList(data: PaginateData): Promise<PaginateResponseList<Product>>;
  stockProductMovements(data: StockMovements): Promise<boolean>;
  deleteProduct(id: string): Promise<boolean>;
}
