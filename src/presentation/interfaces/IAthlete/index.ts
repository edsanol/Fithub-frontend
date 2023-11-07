export interface IAthlete {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  genre: string;
  birthDate: string;
}

export interface IAthleteValidation {
  nameError: boolean;
  lastNameError: boolean;
  emailError: boolean;
  phoneNumberError: boolean;
  genreError: boolean;
  birthDateError: boolean;
}
