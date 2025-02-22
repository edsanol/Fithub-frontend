type ConstructorParams = {
  paymentId: number;
  athleteMembershipId: number;
  paymentAmount: number;
  paymentDate: string;
};

export class TotalPaidRecord {
  public paymentId: number;
  public athleteMembershipId: number;
  public paymentAmount: number;
  public paymentDate: string;

  constructor({
    paymentId,
    athleteMembershipId,
    paymentAmount,
    paymentDate,
  }: ConstructorParams) {
    this.paymentId = paymentId;
    this.athleteMembershipId = athleteMembershipId;
    this.paymentAmount = paymentAmount;
    this.paymentDate = paymentDate;
  }
}
