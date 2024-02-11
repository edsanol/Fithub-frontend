type ConstructorParams = {
  time: Date | string;
  value: number;
};

export class BarGraphicValues {
  public time: Date;
  public value: number;

  constructor({ time, value }: ConstructorParams) {
    this.time = new Date(time);
    this.value = value;
  }
}
