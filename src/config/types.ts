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
  ChangePasswordUseCase: Symbol.for("ChangePasswordUseCase"),
  RecoverPasswordUseCase: Symbol.for("RecoverPasswordUseCase"),
  ResetPasswordUseCase: Symbol.for("ResetPasswordUseCase"),
  GetAccessTypesUseCase: Symbol.for("GetAccessTypesUseCase"),

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
  UpdateMembershipToAthleteUseCase: Symbol.for(
    "UpdateMembershipToAthleteUseCase"
  ),
  CreateMeasurementProgressUseCase: Symbol.for(
    "CreateMeasurementProgressUseCase"
  ),
  GetMeasurementProgressListUseCase: Symbol.for(
    "GetMeasurementProgressListUseCase"
  ),
  GetMeasurementProgressByLastMonthUseCase: Symbol.for(
    "GetMeasurementProgressByLastMonthUseCase"
  ),
  GetMeasurementsGraphicUseCase: Symbol.for("GetMeasurementsGraphicUseCase"),
  UnsubscribeAthleteUserUseCase: Symbol.for("UnsubscribeAthleteUserUseCase"),
  RegisterAthleteByQRUseCase: Symbol.for("RegisterAthleteByQRUseCase"),

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
  GetMembershipByGymIdUseCase: Symbol.for("GetMembershipByGymIdUseCase"),
  RegisterPaymentAmountUseCase: Symbol.for("RegisterPaymentAmountUseCase"),

  // DiscountsRepository
  DiscountsRepository: Symbol.for("DiscountsRepository"),

  // DiscountsService
  DiscountsService: Symbol.for("DiscountsService"),

  // DiscountsUseCases
  RegisterDiscountUseCase: Symbol.for("RegisterDiscountUseCase"),
  GetDiscountsListUseCase: Symbol.for("GetDiscountsListUseCase"),
  GetDiscountByIdUseCase: Symbol.for("GetDiscountByIdUseCase"),
  EditDiscountUseCase: Symbol.for("EditDiscountUseCase"),
  DeleteDiscountUseCase: Symbol.for("DeleteDiscountUseCase"),

  // DashboardService
  DashboardDataService: Symbol.for("DashboardDataService"),

  // SignalRService
  SignalRService: Symbol.for("SignalRService"),

  // DashboardRepository
  DashboardDataRepository: Symbol.for("DashboardDataRepository"),

  // DashboardDataUseCases
  GetDashboardDataUseCase: Symbol.for("GetDashboardDataUseCase"),
  GetDailyAssistanceGraphicUseCase: Symbol.for(
    "GetDailyAssistanceGraphicUseCase"
  ),
  GetIncomeGraphicUseCase: Symbol.for("GetIncomeGraphicUseCase"),
  GetMembershipGraphicUseCase: Symbol.for("GetMembershipGraphicUseCase"),
  GetAthleteAssistanceUseCase: Symbol.for("GetAthleteAssistanceUseCase"),
  GetAthleteBirthDateUseCase: Symbol.for("GetAthleteBirthDateUseCase"),

  // ChannelRepository
  ChannelRepository: Symbol.for("ChannelRepository"),

  // ChannelService
  ChannelService: Symbol.for("ChannelService"),

  // ChannelUseCases
  CreateChannelUseCase: Symbol.for("CreateChannelUseCase"),
  GetChannelsUseCase: Symbol.for("GetChannelsUseCase"),
  AddOrRemoveUsersFromChannelUseCase: Symbol.for("AddOrRemoveUsersFromChannelUseCase"),

  // MessageRepository
  MessageRepository: Symbol.for("MessageRepository"),

  // MessageService
  MessageService: Symbol.for("MessageService"),

  // MessageUseCases
  SendNotificationUseCase: Symbol.for("SendNotificationUseCase"),
  GetNotificationsUseCase: Symbol.for("GetNotificationsUseCase"),

  // SignalRNotificationUseCase
  SignalRNotificationUseCase: Symbol.for("SignalRNotificationUseCase"),

  // RoutineRepository
  RoutineRepository: Symbol.for("RoutineRepository"),

  // RoutineService
  RoutineService: Symbol.for("RoutineService"),

  // RoutineUseCases
  CreateRoutineUseCase: Symbol.for("CreateRoutineUseCase"),
  CreateExerciseUseCase: Symbol.for("CreateExerciseUseCase"),
  GetRoutinesListUseCase: Symbol.for("GetRoutinesListUseCase"),
  GetExercisesListUseCase: Symbol.for("GetExercisesListUseCase"),
  GetMuscleGroupsUseCase: Symbol.for("GetMuscleGroupsUseCase"),
  GetRoutineByIdUseCase: Symbol.for("GetRoutineByIdUseCase"),
  DesactivateRoutineUseCase: Symbol.for("DesactivateRoutineUseCase"),
  UpdateRoutineUseCase: Symbol.for("UpdateRoutineUseCase"),
  SendRoutineUseCase: Symbol.for("SendRoutineUseCase"),
};

export { TYPES };
