const TYPES = {
  HttpClient: Symbol.for("HttpClient"),
  BaseUrl: Symbol.for("BaseUrl"),

  // GymUserService
  GymUserService: Symbol.for("GymUserService"),

  // GymUserRepository
  GymUserRepository: Symbol.for("GymUserRepository"),

  // GymUserUseCases
  RegisterGymUserUseCase: Symbol.for("RegisterGymUserUseCase"),
};

export { TYPES };
