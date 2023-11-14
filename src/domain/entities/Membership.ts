type constructorParams = {
  membershipName: string;
  cost: number;
  durationInDays: number;
  description: string;
  idGym?: number;
};

export class Membership {
  public membershipName: string;
  public cost: number;
  public durationInDays: number;
  public description: string;
  public idGym?: number;

  constructor({
    membershipName,
    cost,
    durationInDays,
    description,
    idGym,
  }: constructorParams) {
    this.membershipName = membershipName;
    this.cost = cost;
    this.durationInDays = durationInDays;
    this.description = description;
    this.idGym = idGym;
  }
}
