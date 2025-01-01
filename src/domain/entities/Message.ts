type constructorParams = {
  channelId: number;
  message: string;
};

export class Message {
  channelId: number;
  message: string;

  constructor(params: constructorParams) {
    this.channelId = params.channelId;
    this.message = params.message;
  }
}
