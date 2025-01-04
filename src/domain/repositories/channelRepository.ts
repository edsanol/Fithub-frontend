import { Channel } from "../entities/Channel";
import { CreateChannel } from "../models/CreateChannel";

export interface ChannelRepository {
  getChannels(): Promise<Channel[]>;
  createChannel(channel: CreateChannel): Promise<boolean>;
  addOrRemoveUsersFromChannel(channel: CreateChannel): Promise<boolean>;
}
