type constructorParams = {
  channelId: number;
  message: string;
  type?: string;
  title?: string;
};

export class Message {
  channelId: number;
  message: string;
  type?: string;
  title?: string;

  constructor(params: constructorParams) {
    this.channelId = params.channelId;
    this.message = params.message;
    this.type = params.type;
    this.title = params.title;
  }
}
