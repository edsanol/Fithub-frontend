type constructorParams = {
  label: string;
  value: number;
};

export class PieGraphicValues {
  public label: string;
  public value: number;

  constructor({ label, value }: constructorParams) {
    this.label = label;
    this.value = value;
  }
}
