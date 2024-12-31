import { TYPES } from "@/config/types";
import { Channel } from "@/domain/entities/Channel";
import { ChannelRepository } from "@/domain/repositories/channelRepository";
import type { ChannelService } from "@/domain/services/channelService";
import { inject, injectable } from "inversify";

@injectable()
export class ChannelRepositoryImpl implements ChannelRepository {
  private readonly service: ChannelService;

  constructor(@inject(TYPES.ChannelService) service: ChannelService) {
    this.service = service;
  }

  async createChannel(channel: Channel): Promise<boolean> {
    const response = await this.service.createChannel(channel);

    return response;
  }

  async getChannels(): Promise<Channel[]> {
    const response = await this.service.getChannels();

    return response;
  }
}
