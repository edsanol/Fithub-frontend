type constructorParams = {
  discountId?: number;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  status?: boolean;
  idMembership?: number;
  idGym?: number;
  comments: string;
};

export class Discounts {
  public discountId?: number;
  public discountPercentage: number;
  public startDate: string;
  public endDate: string;
  public status?: boolean;
  public idMembership?: number;
  public idGym?: number;
  public comments: string;

  constructor({
    discountId,
    discountPercentage,
    startDate,
    endDate,
    status,
    idMembership,
    idGym,
    comments,
  }: constructorParams) {
    this.discountId = discountId;
    this.discountPercentage = discountPercentage;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.idMembership = idMembership;
    this.idGym = idGym;
    this.comments = comments;
  }
}
