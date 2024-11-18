type constructorParams = {
  productId: number;
  quantity: number;
  type: string;
};

export class StockMovements {
  public productId: number;
  public quantity: number;
  public type: string;

  constructor({ productId, quantity, type }: constructorParams) {
    this.productId = productId;
    this.quantity = quantity;
    this.type = type;
  }
}
