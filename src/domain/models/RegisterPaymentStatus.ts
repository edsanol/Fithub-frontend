type ConstructorParams = {
  athleteMembershipId: number;
  paymentAmount: number;
  paymentDate: string;
};

export class RegisterPaymentAmount {
  public athleteMembershipId: number;
  public paymentAmount: number;
  public paymentDate: string;

  constructor({
    athleteMembershipId,
    paymentAmount,
    paymentDate,
  }: ConstructorParams) {
    this.athleteMembershipId = athleteMembershipId;
    this.paymentAmount = paymentAmount;
    this.paymentDate = paymentDate;
  }
}
