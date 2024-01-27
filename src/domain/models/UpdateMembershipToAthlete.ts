type ConstructorParams = {
  athleteId: number;
  membershipId: number;
};

export class UpdateMembershipToAthlete {
  public athleteId: number;
  public membershipId: number;

  constructor({ athleteId, membershipId }: ConstructorParams) {
    this.athleteId = athleteId;
    this.membershipId = membershipId;
  }
}
