type constructorParams = {
  gymName: string;
  email: string;
  password?: string;
  address: string;
  phoneNumber: string;
  registerDate: string;
  subscriptionPlan: string;
  comments: string;
  nit: string;
  token?: string;
  stateGym?: string;
  status?: boolean;
  memberNumber?: number;
};

export class GymUser {
  public gymName: string;
  public email: string;
  public password?: string;
  public address: string;
  public phoneNumber: string;
  public registerDate: string;
  public subscriptionPlan: string;
  public comments: string;
  public nit: string;
  public token?: string;
  public stateGym?: string;
  public status?: boolean;
  public memberNumber?: number;

  constructor({
    gymName,
    email,
    password,
    address,
    phoneNumber,
    registerDate,
    subscriptionPlan,
    comments,
    nit,
    token,
    stateGym,
    status,
    memberNumber,
  }: constructorParams) {
    this.gymName = gymName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.registerDate = registerDate;
    this.subscriptionPlan = subscriptionPlan;
    this.comments = comments;
    this.nit = nit;
    this.token = token;
    this.stateGym = stateGym;
    this.status = status;
    this.memberNumber = memberNumber;
  }
}
