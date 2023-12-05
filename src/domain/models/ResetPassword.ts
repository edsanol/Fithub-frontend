type constructorParams = {
  newPassword?: string;
  confirmPassword?: string;
  email?: string;
  token?: string;
  oldPassword?: string;
};

export class ResetPassword {
  public newPassword?: string;
  public confirmPassword?: string;
  public email?: string;
  public token?: string;
  public oldPassword?: string;

  constructor({
    newPassword,
    confirmPassword,
    email,
    token,
    oldPassword,
  }: constructorParams) {
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
    this.email = email;
    this.token = token;
    this.oldPassword = oldPassword;
  }
}
