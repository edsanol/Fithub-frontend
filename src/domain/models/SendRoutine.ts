type ConstructorParams = {
  routineId: number;
  channelId: number;
  startDate: string;
  endDate: string;
};

export class SendRoutine {
  public routineId: number;
  public channelId: number;
  public startDate: string;
  public endDate: string;

  constructor({ routineId, channelId, startDate, endDate }: ConstructorParams) {
    this.routineId = routineId;
    this.channelId = channelId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
