import { Channel } from "../entities/Channel";

export interface ChannelRepository {
  createChannel(channel: Channel): Promise<boolean>;
}
