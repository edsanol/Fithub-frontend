type constructorParams = {
  name?: string;
  channelId?: number;
  userIds: number[];
  allUsersSelected: boolean;
  deselectedUserIds: number[];
  allUsersSelectedByMembersip: boolean;
  membershipIds: number[];
};

export class CreateChannel {
  public name?: string;
  public channelId?: number;
  public userIds: number[];
  public allUsersSelected: boolean;
  public deselectedUserIds: number[];
  public allUsersSelectedByMembersip: boolean;
  public membershipIds: number[];

  constructor({
    name,
    channelId,
    userIds,
    allUsersSelected,
    deselectedUserIds,
    allUsersSelectedByMembersip,
    membershipIds,
  }: constructorParams) {
    this.name = name;
    this.channelId = channelId;
    this.userIds = userIds;
    this.allUsersSelected = allUsersSelected;
    this.deselectedUserIds = deselectedUserIds;
    this.allUsersSelectedByMembersip = allUsersSelectedByMembersip;
    this.membershipIds = membershipIds;
  }
}
