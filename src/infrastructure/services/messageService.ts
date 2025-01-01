import { MessageService } from "@/domain/services/messageService";
import { inject, injectable } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { Message } from "@/domain/entities/Message";
import { TickerResponseApi } from "../api/model/TickerResponseApi";

@injectable()
export class MessageServiceImpl implements MessageService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }

  async sendNotification(message: Message): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, Message>("/Notification/SendNotification", message);

    return response.data;
  }
}
