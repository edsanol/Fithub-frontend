type ConstructorParams = {
  muscle: string;
  progress: number;
  measurement: number;
  progressPercentage: number;
};

export class MeasurementProgressByLastMonth {
  public muscle: string;
  public progress: number;
  public measurement: number;
  public progressPercentage: number;

  constructor({
    muscle,
    progress,
    measurement,
    progressPercentage,
  }: ConstructorParams) {
    this.muscle = muscle;
    this.progress = progress;
    this.measurement = measurement;
    this.progressPercentage = progressPercentage;
  }
}
