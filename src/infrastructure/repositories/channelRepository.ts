import { TYPES } from "@/config/types";
import { Channel } from "@/domain/entities/Channel";
import { CreateChannel } from "@/domain/models/CreateChannel";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { ChannelRepository } from "@/domain/repositories/channelRepository";
import type { ChannelService } from "@/domain/services/channelService";
import { inject, injectable } from "inversify";

@injectable()
export class ChannelRepositoryImpl implements ChannelRepository {
  private readonly service: ChannelService;

  constructor(@inject(TYPES.ChannelService) service: ChannelService) {
    this.service = service;
  }

  async createChannel(channel: CreateChannel): Promise<boolean> {
    const response = await this.service.createChannel(channel);

    return response;
  }

  async getChannels(data: PaginateData): Promise<PaginateResponseList<Channel>> {
    const response = await this.service.getChannels(data);

    return response;
  }

  async addOrRemoveUsersFromChannel(channel: CreateChannel): Promise<boolean> {
    const response = await this.service.addOrRemoveUsersFromChannel(channel);

    return response;
  }
}
