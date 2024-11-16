type constructorParams = {
  categoryId?: number;
  categoryName: string;
};

export class Category {
  public categoryId?: number;
  public categoryName: string;

  constructor({ categoryId, categoryName }: constructorParams) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }
}
