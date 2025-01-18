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
  lastMessage?: string;
};

export class Channel {
  public name?: string;
  public userIds?: number[];
  public channelId?: number;
  public channelName?: string;
  public channelAthletes?: Athlete[];
  public lastMessage?: string;

  constructor({ name, userIds, channelId, channelName, channelAthletes, lastMessage }: constructorParams) {
    this.name = name;
    this.userIds = userIds;
    this.channelId = channelId;
    this.channelName = channelName;
    this.channelAthletes = channelAthletes;
    this.lastMessage = lastMessage;
  }
}
