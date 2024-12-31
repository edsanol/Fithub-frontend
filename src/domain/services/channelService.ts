import { Channel } from "../entities/Channel";

export interface ChannelService {
  createChannel(channel: Channel): Promise<boolean>;
}
