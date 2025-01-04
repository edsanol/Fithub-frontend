import { TYPES } from "@/config/types";
import { CreateChannel } from "@/domain/models/CreateChannel";
import type { ChannelRepository } from "@/domain/repositories/channelRepository";
import { inject, injectable } from "inversify";

@injectable()
export class CreateChannelUseCase {
  constructor(
    @inject(TYPES.ChannelRepository)
    private channelRepository: ChannelRepository
  ) {}

  async execute(channel: CreateChannel): Promise<boolean> {
    return await this.channelRepository.createChannel(channel);
  }
}
