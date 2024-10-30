type ConstructorParams = {
  athleteId: number;
  membershipId: number;
  startMembershipDate?: string;
};

export class UpdateMembershipToAthlete {
  public athleteId: number;
  public membershipId: number;
  public startMembershipDate?: string;

  constructor({ athleteId, membershipId, startMembershipDate }: ConstructorParams) {
    this.athleteId = athleteId;
    this.membershipId = membershipId;
    this.startMembershipDate = startMembershipDate;
  }
}
