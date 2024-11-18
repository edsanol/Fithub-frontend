export interface IProductValidation {
  nameError: boolean;
  descriptionError: boolean;
  basePriceError: boolean;
  skuError: boolean;
  priceError: boolean;
  stockQuantityError: boolean;
  idCategoryError: boolean;
}

export interface IStockMovementValidation {
  typeError: boolean;
  quantityError: boolean;
}
