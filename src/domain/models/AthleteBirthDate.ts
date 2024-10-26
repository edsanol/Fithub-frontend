type ConstructorParams = {
  athleteId: number;
  athleteName: string;
  athleteLastName: string;
  birthDate: string;
  age: number;
};

export class AthleteBirthDate {
  public athleteId: number;
  public athleteName: string;
  public athleteLastName: string;
  public birthDate: string;
  public age: number;

  constructor({
    athleteId,
    athleteName,
    athleteLastName,
    birthDate,
    age,
  }: ConstructorParams) {
    this.athleteId = athleteId;
    this.athleteName = athleteName;
    this.athleteLastName = athleteLastName;
    this.birthDate = birthDate;
    this.age = age;
  }
}
