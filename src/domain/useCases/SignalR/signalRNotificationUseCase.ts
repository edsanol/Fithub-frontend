import { TYPES } from "@/config/types";
import type { SignalRService } from "@/domain/services/signalRService";
import { inject, injectable } from "inversify";

@injectable()
export class SignalRNotificationUseCase {
  constructor(
    @inject(TYPES.SignalRService) private signalRService: SignalRService
  ) {}

  async initializeConnection(): Promise<void> {
    await this.signalRService.connect();
  }

  subscribeToNotifications(
    callback: (channelId: number, message: string) => void
  ): void {
    this.signalRService.on("ReceiveMessage", callback);
  }

  unsubscribeFromNotifications(): void {
    this.signalRService.off("ReceiveMessage");
  }

  async joinChannel(channelId: number): Promise<void> {
    await this.signalRService.invoke("JoinChannel", channelId);
  }

  disconnect(): void {
    this.signalRService.disconnect();
  }
}
