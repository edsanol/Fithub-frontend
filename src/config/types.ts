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

  // AthleteUserService
  AthleteUserService: Symbol.for("AthleteUserService"),

  // AthleteUserRepository
  AthleteUserRepository: Symbol.for("AthleteUserRepository"),

  // AthleteUserUseCases
  RegisterAthleteUserUseCase: Symbol.for("RegisterAthleteUserUseCase"),
};

export { TYPES };
