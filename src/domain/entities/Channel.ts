interface Athlete {
  athleteId: number;
  athleteName: string;
}

type constructorParams = {
  name?: string;
  userIds?: number[];
  channelId?: number;
  channelName?: string;
  channelAthletes?: Athlete[];
};

export class Channel {
  public name?: string;
  public userIds?: number[];
  public channelId?: number;
  public channelName?: string;
  public channelAthletes?: Athlete[];

  constructor({ name, userIds }: constructorParams) {
    this.name = name;
    this.userIds = userIds;
  }
}
