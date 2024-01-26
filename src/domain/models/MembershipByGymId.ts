type ConstructorParams = {
  membershipID: number;
  membershipName: string;
  gymID: number;
};

export class MembershipByGymId {
  public membershipID: number;
  public membershipName: string;
  public gymID: number;

  constructor({ membershipID, membershipName, gymID }: ConstructorParams) {
    this.membershipID = membershipID;
    this.membershipName = membershipName;
    this.gymID = gymID;
  }
}
