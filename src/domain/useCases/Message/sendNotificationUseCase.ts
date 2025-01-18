import { TYPES } from "@/config/types";
import { Message } from "@/domain/entities/Message";
import type { MessageRepository } from "@/domain/repositories/messageRepository";
import { inject, injectable } from "inversify";

@injectable()
export class SendNotificationUseCase {
  constructor(
    @inject(TYPES.MessageRepository)
    private messageRepository: MessageRepository
  ) {}

  async execute(message: Message): Promise<boolean> {
    return await this.messageRepository.sendNotification(message);
  }
}
