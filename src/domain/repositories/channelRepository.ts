import { Channel } from "../entities/Channel";

export interface ChannelRepository {
  getChannels(): Promise<Channel[]>;
  createChannel(channel: Channel): Promise<boolean>;
}
