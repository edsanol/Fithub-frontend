type ConstructorParams = {
  totalPaid: number;
  remainingAmount: number;
};

export class TotalPaid {
  public totalPaid: number;
  public remainingAmount: number;

  constructor({ totalPaid, remainingAmount }: ConstructorParams) {
    this.totalPaid = totalPaid;
    this.remainingAmount = remainingAmount;
  }
}
