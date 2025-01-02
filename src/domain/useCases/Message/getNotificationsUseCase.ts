import { TYPES } from "@/config/types";
import { GetNotifications } from "@/domain/models/getNotifications";
import type { MessageRepository } from "@/domain/repositories/messageRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetNotificationsUseCase {
  constructor(
    @inject(TYPES.MessageRepository)
    private messageRepository: MessageRepository
  ) {}

  async execute(id: number): Promise<GetNotifications[]> {
    return await this.messageRepository.getNotifications(id);
  }
}
