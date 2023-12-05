type constructorParams = {
  membershipID?: number;
  membershipName: string;
  cost: number;
  durationInDays: number;
  description: string;
  idGym?: number;
  status?: boolean;
};

export class Membership {
  public membershipID?: number;
  public membershipName: string;
  public cost: number;
  public durationInDays: number;
  public description: string;
  public idGym?: number;
  public status?: boolean;

  constructor({
    membershipID,
    membershipName,
    cost,
    durationInDays,
    description,
    idGym,
    status,
  }: constructorParams) {
    this.membershipID = membershipID;
    this.membershipName = membershipName;
    this.cost = cost;
    this.durationInDays = durationInDays;
    this.description = description;
    this.idGym = idGym;
    this.status = status;
  }
}
