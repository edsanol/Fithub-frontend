export interface IAthlete {
  athleteId: number;
  athleteName: string;
  athleteLastName: string;
  email: string;
  phoneNumber: string;
  genre: string;
  birthDate: string;
  registerDate: string;
  stateAthlete?: string;
  status: boolean;
  token?: string | null;
  idGym?: number;
  gymName?: string;
}

export interface IAthleteValidation {
  nameError: boolean;
  lastNameError: boolean;
  emailError: boolean;
  phoneNumberError: boolean;
  genreError: boolean;
  birthDateError: boolean;
}

export interface IAthleteUserList {
  totalRecords: number;
  items: IAthlete[];
}
