import { TYPES } from "@/config/types";
import { Channel } from "@/domain/entities/Channel";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import type { ChannelRepository } from "@/domain/repositories/channelRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetChannelsUseCase {
  constructor(
    @inject(TYPES.ChannelRepository)
    private channelRepository: ChannelRepository
  ) {}

  async execute(data: PaginateData): Promise<PaginateResponseList<Channel>> {
    return this.channelRepository.getChannels(data);
  }
}
