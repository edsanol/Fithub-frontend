export interface IAthleteValidation {
  nameError: boolean;
  lastNameError: boolean;
  phoneNumberError: boolean;
  genreError: boolean;
  birthDateError: boolean;
  startMembershipDateError?: boolean;
  documentIDError: boolean;
}

export interface ISelfRegistrationValidation {
  nameError: boolean;
  lastNameError: boolean;
  phoneNumberError: boolean;
  genreError: boolean;
  birthDateError: boolean;
  documentIDError: boolean;
}
