type constructorParams = {
  email: string;
  password?: string;
};

export class UserLogin {
  public email: string;
  public password?: string;

  constructor({ email, password }: constructorParams) {
    this.email = email;
    this.password = password;
  }
}
