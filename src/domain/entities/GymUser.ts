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
  }
}
