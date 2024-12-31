import { TYPES } from "@/config/types";
import { Channel } from "@/domain/entities/Channel";
import type { ChannelRepository } from "@/domain/repositories/channelRepository";
import { inject, injectable } from "inversify";

@injectable()
export class CreateChannelUseCase {
  constructor(
    @inject(TYPES.ChannelRepository)
    private channelRepository: ChannelRepository
  ) {}

  async execute(channel: Channel): Promise<boolean> {
    return await this.channelRepository.createChannel(channel);
  }
}
