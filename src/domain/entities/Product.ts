type constructorParams = {
  name: string;
  description: string;
  idCategory: number;
  basePrice: number;
  idGym: number;
  sku: string;
  price: number;
  stockQuantity: number;
  productId?: number;
  categoryId?: number;
  categoryName?: string;
};

export class Product {
  public name: string;
  public description: string;
  public idCategory: number;
  public basePrice: number;
  public idGym: number;
  public sku: string;
  public price: number;
  public stockQuantity: number;
  public productId?: number;
  public categoryId?: number;
  public categoryName?: string;

  constructor({
    name,
    description,
    idCategory,
    basePrice,
    idGym,
    sku,
    price,
    stockQuantity,
    productId,
    categoryId,
    categoryName,
  }: constructorParams) {
    this.name = name;
    this.description = description;
    this.idCategory = idCategory;
    this.basePrice = basePrice;
    this.idGym = idGym;
    this.sku = sku;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.productId = productId;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }
}
