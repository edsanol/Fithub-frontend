import { ChannelService } from "@/domain/services/channelService";
import { inject, injectable } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { Channel } from "@/domain/entities/Channel";
import { TickerResponseApi } from "../api/model/TickerResponseApi";

@injectable()
export class ChannelServiceImpl implements ChannelService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }

  async createChannel(channel: Channel): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, Channel>("/Notification/CreateChannel", channel);

    return response.data;
  }

  async getChannels(): Promise<Channel[]> {
    const response = await this.http.get<TickerResponseApi<Channel[]>>("/Notification/GetChannels");

    return response.data;
  }

  async addOrRemoveUsersFromChannel(channelId: number, userIds: number[]): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, { channelId: number; userIds: number[] }>("/Notification/AddUserToChannel", {
      channelId,
      userIds,
    });

    return response.data;
  }
}
