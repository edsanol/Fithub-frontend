import { TYPES } from "@/config/types";
import type { ChannelRepository } from "@/domain/repositories/channelRepository";
import { inject, injectable } from "inversify";

@injectable()
export class AddOrRemoveUsersFromChannelUseCase {
  constructor(
    @inject(TYPES.ChannelRepository)
    private channelRepository: ChannelRepository
  ) {}

  async execute(channelId: number, userIds: number[]): Promise<boolean> {
    return this.channelRepository.addOrRemoveUsersFromChannel(channelId, userIds);
  }
}