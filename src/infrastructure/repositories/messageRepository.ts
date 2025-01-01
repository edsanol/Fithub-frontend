import { TYPES } from "@/config/types";
import { Message } from "@/domain/entities/Message";
import { MessageRepository } from "@/domain/repositories/messageRepository";
import type { MessageService } from "@/domain/services/messageService";
import { inject, injectable } from "inversify";

@injectable()
export class MessageRepositoryImpl implements MessageRepository {
  private readonly service: MessageService;

  constructor(@inject(TYPES.MessageService) service: MessageService) {
    this.service = service;
  }

  async sendNotification(message: Message): Promise<boolean> {
    const response = await this.service.sendNotification(message);

    return response;
  }
}
