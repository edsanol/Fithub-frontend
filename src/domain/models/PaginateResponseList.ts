type constructorParams<T = any> = {
  totalRecords: number;
  items: T[];
};

export class PaginateResponseList<T = any> {
  public totalRecords: number;
  public items: T[];

  constructor({ totalRecords, items }: constructorParams<T>) {
    this.totalRecords = totalRecords;
    this.items = items;
  }
}
