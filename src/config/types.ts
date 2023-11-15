const TYPES = {
  HttpClient: Symbol.for("HttpClient"),
  BaseUrl: Symbol.for("BaseUrl"),

  // GymUserService
  GymUserService: Symbol.for("GymUserService"),

  // GymUserRepository
  GymUserRepository: Symbol.for("GymUserRepository"),

  // GymUserUseCases
  RegisterGymUserUseCase: Symbol.for("RegisterGymUserUseCase"),
  LoginGymUserUseCase: Symbol.for("LoginGymUserUseCase"),
  EditGymUserUseCase: Symbol.for("EditGymUserUseCase"),
  GetGymUserByIdUseCase: Symbol.for("GetGymUserByIdUseCase"),

  // AthleteUserService
  AthleteUserService: Symbol.for("AthleteUserService"),

  // AthleteUserRepository
  AthleteUserRepository: Symbol.for("AthleteUserRepository"),

  // AthleteUserUseCases
  RegisterAthleteUserUseCase: Symbol.for("RegisterAthleteUserUseCase"),
  GetAthleteUserListUseCase: Symbol.for("GetAthleteUserListUseCase"),
};

export { TYPES };
