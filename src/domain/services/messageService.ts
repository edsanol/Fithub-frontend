import { Message } from "../entities/Message";

export interface MessageService {
  sendNotification(message: Message): Promise<boolean>;
}
