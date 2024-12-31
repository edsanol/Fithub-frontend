import { TYPES } from "@/config/types";
import { Channel } from "@/domain/entities/Channel";
import type { ChannelRepository } from "@/domain/repositories/channelRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetChannelsUseCase {
  constructor(
    @inject(TYPES.ChannelRepository)
    private channelRepository: ChannelRepository
  ) {}

  async execute(): Promise<Channel[]> {
    return await this.channelRepository.getChannels();
  }
}
