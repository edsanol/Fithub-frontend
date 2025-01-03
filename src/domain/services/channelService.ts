import { Channel } from "../entities/Channel";

export interface ChannelService {
  getChannels(): Promise<Channel[]>;
  createChannel(channel: Channel): Promise<boolean>;
  addOrRemoveUsersFromChannel(channelId: number, userIds: number[]): Promise<boolean>;
}
