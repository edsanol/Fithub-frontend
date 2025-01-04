import { ChannelService } from "@/domain/services/channelService";
import { inject, injectable } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { Channel } from "@/domain/entities/Channel";
import { TickerResponseApi } from "../api/model/TickerResponseApi";
import { CreateChannel } from "@/domain/models/CreateChannel";

@injectable()
export class ChannelServiceImpl implements ChannelService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }

  async createChannel(channel: CreateChannel): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, Channel>("/Notification/CreateChannel", channel);

    return response.data;
  }

  async getChannels(): Promise<Channel[]> {
    const response = await this.http.get<TickerResponseApi<Channel[]>>("/Notification/GetChannels");

    return response.data;
  }

  async addOrRemoveUsersFromChannel(channel: CreateChannel): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, CreateChannel>("/Notification/AddUserToChannel", channel);

    return response.data;
  }
}
