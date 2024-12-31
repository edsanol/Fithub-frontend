type constructorParams = {
  name: string;
  userIds: number[];
};

export class Channel {
  public name: string;
  public userIds: number[];

  constructor({ name, userIds }: constructorParams) {
    this.name = name;
    this.userIds = userIds;
  }
}
