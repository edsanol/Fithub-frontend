import { Message } from "../entities/Message";

export interface MessageRepository {
  sendNotification(message: Message): Promise<boolean>;
}
