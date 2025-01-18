import { Channel } from "../entities/Channel";
import { CreateChannel } from "../models/CreateChannel";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface ChannelService {
  getChannels(data: PaginateData): Promise<PaginateResponseList<Channel>>;
  createChannel(channel: CreateChannel): Promise<boolean>;
  addOrRemoveUsersFromChannel(channel: CreateChannel): Promise<boolean>;
}
