type ConstructorParams = {
  athleteId: number;
  membershipId: number;
  startMembershipDate?: string;
  discount?: number;
  paymentAmount?: number;
};

export class UpdateMembershipToAthlete {
  public athleteId: number;
  public membershipId: number;
  public startMembershipDate?: string;
  public discount?: number;
  public paymentAmount?: number;

  constructor({ athleteId, membershipId, startMembershipDate, discount, paymentAmount }: ConstructorParams) {
    this.athleteId = athleteId;
    this.membershipId = membershipId;
    this.startMembershipDate = startMembershipDate;
    this.discount = discount;
    this.paymentAmount = paymentAmount;
  }
}
