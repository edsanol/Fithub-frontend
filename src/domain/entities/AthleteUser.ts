type constructorParams = {
  athleteName: string;
  athleteLastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  genre: string;
  idGym: number;
  gymName: string;
  registerDate: string;
  status: true;
};

export class AthleteUser {
  public athleteName: string;
  public athleteLastName: string;
  public email: string;
  public phoneNumber: string;
  public birthDate: string;
  public genre: string;
  public idGym: number;
  public gymName: string;
  public registerDate: string;
  public status: true;

  constructor({
    athleteName,
    athleteLastName,
    email,
    phoneNumber,
    birthDate,
    genre,
    idGym,
    gymName,
    registerDate,
    status,
  }: constructorParams) {
    this.athleteName = athleteName;
    this.athleteLastName = athleteLastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.genre = genre;
    this.idGym = idGym;
    this.gymName = gymName;
    this.registerDate = registerDate;
    this.status = status;
  }
}
