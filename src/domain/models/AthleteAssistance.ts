type ConstructorParams = {
  athleteId: number;
  athleteName: string;
  athleteLastName: string;
  email: string;
  dateAssistence: string;
  timeAssistence: string;
};

export class AthleteAssistance {
  public athleteId: number;
  public athleteName: string;
  public athleteLastName: string;
  public email: string;
  public dateAssistence: string;
  public timeAssistence: string;

  constructor({
    athleteId,
    athleteName,
    athleteLastName,
    email,
    dateAssistence,
    timeAssistence,
  }: ConstructorParams) {
    this.athleteId = athleteId;
    this.athleteName = athleteName;
    this.athleteLastName = athleteLastName;
    this.email = email;
    this.dateAssistence = dateAssistence;
    this.timeAssistence = timeAssistence;
  }
}
