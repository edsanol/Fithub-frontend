import { Message } from "../entities/Message";
import { GetNotifications } from "../models/getNotifications";

export interface MessageService {
  sendNotification(message: Message): Promise<boolean>;
  getNotifications(id: number): Promise<GetNotifications[]>;
}
