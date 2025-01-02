type constructorParams = {
  notificationId: number;
  channelId: number;
  message: string;
  sendAt: string;
};

export class GetNotifications {
  public notificationId: number;
  public channelId: number;
  public message: string;
  public sendAt: string;

  constructor({
    notificationId,
    channelId,
    message,
    sendAt,
  }: constructorParams) {
    this.notificationId = notificationId;
    this.channelId = channelId;
    this.message = message;
    this.sendAt = sendAt;
  }
}
