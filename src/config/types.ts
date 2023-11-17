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
  GetAthleteUserByIdUseCase: Symbol.for("GetAthleteUserByIdUseCase"),
  EditAthleteUserUseCase: Symbol.for("EditAthleteUserUseCase"),
  DeleteAthleteUserUseCase: Symbol.for("DeleteAthleteUserUseCase"),

  // MembershipRepository
  MembershipRepository: Symbol.for("MembershipRepository"),

  // MembershipService
  MembershipService: Symbol.for("MembershipService"),

  // MembershipUseCases
  RegisterMembershipUseCase: Symbol.for("RegisterMembershipUseCase"),
  GetMembershipListUseCase: Symbol.for("GetMembershipListUseCase"),
  GetMembershipByIdUseCase: Symbol.for("GetMembershipByIdUseCase"),
  EditMembershipUseCase: Symbol.for("EditMembershipUseCase"),
  DeleteMembershipUseCase: Symbol.for("DeleteMembershipUseCase"),
};

export { TYPES };
