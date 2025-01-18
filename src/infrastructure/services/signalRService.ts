import { SignalRService } from "@/domain/services/signalRService";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { injectable } from "inversify";

@injectable()
export class SignalRServiceImpl implements SignalRService {
  private connection: HubConnection | null = null;

  async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = new HubConnectionBuilder()
        .withUrl("https://api.fithubplus.com/hubs/notification", {
          withCredentials: true,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
    }

    if (this.connection.state === "Disconnected") {
      await this.connection.start();
    }
  }

  disconnect(): void {
    if (this.connection?.state === "Connected") {
      this.connection.stop();
    }
  }

  on(eventName: string, callback: (...args: any[]) => void): void {
    if (this.connection) {
      this.connection.on(eventName, callback);
    }
  }

  off(eventName: string): void {
    if (this.connection) {
      this.connection.off(eventName);
    }
  }

  async invoke<T>(methodName: string, channelId: number): Promise<T> {
    if (this.connection?.state === "Connected") {
      return this.connection.invoke<T>(methodName, channelId);
    }
    throw new Error("SignalR connection is not established");
  }
}
