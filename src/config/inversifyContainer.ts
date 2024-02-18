import "reflect-metadata";
import { Container } from "inversify";
import { AxiosHttpClient, HttpClient } from "@/infrastructure/api/http";
import { TYPES } from "./types";
import { GymUserService } from "@/domain/services/gymUserService";
import { GymUserServiceImpl } from "@/infrastructure/services/gymUserService";
import { GymUserRepositoryImpl } from "@/infrastructure/repositories/gymUserRepository";
import { GymUserRepository } from "@/domain/repositories/gymUserRepository";
import { RegisterGymUserUseCase } from "@/domain/useCases/GymUser/registerGymUserUseCase";
import { LoginGymUserUseCase } from "@/domain/useCases/GymUser/loginGymUserUseCase";
import { AthleteUserService } from "@/domain/services/athleteUserService";
import { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { AthleteUserRepositoryImpl } from "@/infrastructure/repositories/athleteUserRepository";
import { AthleteUserServiceImpl } from "@/infrastructure/services/athleteUserService";
import { RegisterAthleteUserUseCase } from "@/domain/useCases/AthleteUser/registerAthleteUserUseCase";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import { EditGymUserUseCase } from "@/domain/useCases/GymUser/editGymUserUseCase";
import { GetGymUserByIdUseCase } from "@/domain/useCases/GymUser/getGymUserByIdUseCase";
import { GetAthleteUserByIdUseCase } from "@/domain/useCases/AthleteUser/getAtleteUserByIdUseCase";
import { EditAthleteUserUseCase } from "@/domain/useCases/AthleteUser/editAthleteUserUseCase";
import { DeleteAthleteUserUseCase } from "@/domain/useCases/AthleteUser/deleteAthleteUserUseCase";
import { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { MembershipService } from "@/domain/services/membershipService";
import { MembershipRepositoryImpl } from "@/infrastructure/repositories/membershipRepository";
import { MembershipServiceImpl } from "@/infrastructure/services/membershipService";
import { RegisterMembershipUseCase } from "@/domain/useCases/Membership/registerMembershipUseCase";
import { GetMembershipListUseCase } from "@/domain/useCases/Membership/getMembershipListUseCase";
import { GetMembershipByIdUseCase } from "@/domain/useCases/Membership/getMembershipByIdUseCase";
import { EditMembershipUseCase } from "@/domain/useCases/Membership/editMembershipUseCase";
import { DeleteMembershipUseCase } from "@/domain/useCases/Membership/deleteMembershipUseCase";
import { DiscountsRepository } from "@/domain/repositories/discountsRepository";
import { DiscountsService } from "@/domain/services/discountsService";
import { DiscountsRepositoryImpl } from "@/infrastructure/repositories/discountsRepository";
import { DiscountsServiceImpl } from "@/infrastructure/services/discountsService";
import { RegisterDiscountUseCase } from "@/domain/useCases/Discounts/registerDiscounts";
import { GetDiscountsListUseCase } from "@/domain/useCases/Discounts/getDiscountsList";
import { GetDiscountByIdUseCase } from "@/domain/useCases/Discounts/getDiscountById";
import { EditDiscountUseCase } from "@/domain/useCases/Discounts/editDiscount";
import { DeleteDiscountUseCase } from "@/domain/useCases/Discounts/deleteDiscount";
import { ChangePasswordUseCase } from "@/domain/useCases/GymUser/changePasswordUseCase";
import { RecoverPasswordUseCase } from "@/domain/useCases/GymUser/recoverPasswordUseCase";
import { ResetPasswordUseCase } from "@/domain/useCases/GymUser/resetPasswordUseCase";
import { GetMembershipByGymIdUseCase } from "@/domain/useCases/Membership/getMembershipByGymIdUseCase";
import { UpdateMembershipToAthleteUseCase } from "@/domain/useCases/AthleteUser/updateMembershipToAthlete";
import { DashboardDataService } from "@/domain/services/dashboardDataService";
import { DashboardDataServiceImpl } from "@/infrastructure/services/dashboardDataService";
import { DashboardDataRepository } from "@/domain/repositories/dashboardDataRepository";
import { DashboardDataRepositoryImpl } from "@/infrastructure/repositories/dashboardDataRepository";
import { GetDashboardDataUseCase } from "@/domain/useCases/Dashboard/getDashboardData";
import { GetDailyAssistanceGraphicUseCase } from "@/domain/useCases/Dashboard/getDailyAssistanceGraphic";
import { GetIncomeGraphicUseCase } from "@/domain/useCases/Dashboard/getIncomeGraphic";
import { GetMembershipGraphicUseCase } from "@/domain/useCases/Dashboard/getMembershipGraphic";
import { CreateMeasurementProgressUseCase } from "@/domain/useCases/AthleteUser/createMeasurementProgressUseCase";
import { GetMeasurementProgressListUseCase } from "@/domain/useCases/AthleteUser/getMeasurementProgressListUseCase";
import { GetMeasurementProgressByLastMonthUseCase } from "@/domain/useCases/AthleteUser/getMeasurementProgressByLastMonthUseCase";
import { GetMeasurementsGraphicUseCase } from "@/domain/useCases/AthleteUser/getMeasurementsGraphicUseCase";

const container = new Container();

// HttpClient
container.bind<HttpClient>(TYPES.HttpClient).to(AxiosHttpClient);

// BaseUrl
container
  .bind<string>(TYPES.BaseUrl)
  .toConstantValue(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api`);

// GymUserService
container.bind<GymUserService>(TYPES.GymUserService).to(GymUserServiceImpl);

// GymUserRepository
container
  .bind<GymUserRepository>(TYPES.GymUserRepository)
  .to(GymUserRepositoryImpl);

// GymUserUseCases
container
  .bind<RegisterGymUserUseCase>(TYPES.RegisterGymUserUseCase)
  .to(RegisterGymUserUseCase);
container
  .bind<LoginGymUserUseCase>(TYPES.LoginGymUserUseCase)
  .to(LoginGymUserUseCase);
container
  .bind<EditGymUserUseCase>(TYPES.EditGymUserUseCase)
  .to(EditGymUserUseCase);
container
  .bind<GetGymUserByIdUseCase>(TYPES.GetGymUserByIdUseCase)
  .to(GetGymUserByIdUseCase);
container
  .bind<ChangePasswordUseCase>(TYPES.ChangePasswordUseCase)
  .to(ChangePasswordUseCase);
container
  .bind<RecoverPasswordUseCase>(TYPES.RecoverPasswordUseCase)
  .to(RecoverPasswordUseCase);
container
  .bind<ResetPasswordUseCase>(TYPES.ResetPasswordUseCase)
  .to(ResetPasswordUseCase);

// AthleteUserService
container
  .bind<AthleteUserService>(TYPES.AthleteUserService)
  .to(AthleteUserServiceImpl);

// AthleteUserRepository
container
  .bind<AthleteUserRepository>(TYPES.AthleteUserRepository)
  .to(AthleteUserRepositoryImpl);

// AthleteUserUseCases
container
  .bind<RegisterAthleteUserUseCase>(TYPES.RegisterAthleteUserUseCase)
  .to(RegisterAthleteUserUseCase);
container
  .bind<GetAthleteUserListUseCase>(TYPES.GetAthleteUserListUseCase)
  .to(GetAthleteUserListUseCase);
container
  .bind<GetAthleteUserByIdUseCase>(TYPES.GetAthleteUserByIdUseCase)
  .to(GetAthleteUserByIdUseCase);
container
  .bind<EditAthleteUserUseCase>(TYPES.EditAthleteUserUseCase)
  .to(EditAthleteUserUseCase);
container
  .bind<DeleteAthleteUserUseCase>(TYPES.DeleteAthleteUserUseCase)
  .to(DeleteAthleteUserUseCase);
container
  .bind<UpdateMembershipToAthleteUseCase>(
    TYPES.UpdateMembershipToAthleteUseCase
  )
  .to(UpdateMembershipToAthleteUseCase);
container
  .bind<CreateMeasurementProgressUseCase>(
    TYPES.CreateMeasurementProgressUseCase
  )
  .to(CreateMeasurementProgressUseCase);
container
  .bind<GetMeasurementProgressListUseCase>(
    TYPES.GetMeasurementProgressListUseCase
  )
  .to(GetMeasurementProgressListUseCase);
container
  .bind<GetMeasurementProgressByLastMonthUseCase>(
    TYPES.GetMeasurementProgressByLastMonthUseCase
  )
  .to(GetMeasurementProgressByLastMonthUseCase);
container
  .bind<GetMeasurementsGraphicUseCase>(TYPES.GetMeasurementsGraphicUseCase)
  .to(GetMeasurementsGraphicUseCase);

// MembershipRepository
container
  .bind<MembershipRepository>(TYPES.MembershipRepository)
  .to(MembershipRepositoryImpl);

// MembershipService
container
  .bind<MembershipService>(TYPES.MembershipService)
  .to(MembershipServiceImpl);

// MembershipUseCases
container
  .bind<RegisterMembershipUseCase>(TYPES.RegisterMembershipUseCase)
  .to(RegisterMembershipUseCase);
container
  .bind<GetMembershipListUseCase>(TYPES.GetMembershipListUseCase)
  .to(GetMembershipListUseCase);
container
  .bind<GetMembershipByIdUseCase>(TYPES.GetMembershipByIdUseCase)
  .to(GetMembershipByIdUseCase);
container
  .bind<EditMembershipUseCase>(TYPES.EditMembershipUseCase)
  .to(EditMembershipUseCase);
container
  .bind<DeleteMembershipUseCase>(TYPES.DeleteMembershipUseCase)
  .to(DeleteMembershipUseCase);
container
  .bind<GetMembershipByGymIdUseCase>(TYPES.GetMembershipByGymIdUseCase)
  .to(GetMembershipByGymIdUseCase);

// DiscountsRepository
container
  .bind<DiscountsRepository>(TYPES.DiscountsRepository)
  .to(DiscountsRepositoryImpl);

// DiscountsService
container
  .bind<DiscountsService>(TYPES.DiscountsService)
  .to(DiscountsServiceImpl);

// DiscountsUseCases
container
  .bind<RegisterDiscountUseCase>(TYPES.RegisterDiscountUseCase)
  .to(RegisterDiscountUseCase);
container
  .bind<GetDiscountsListUseCase>(TYPES.GetDiscountsListUseCase)
  .to(GetDiscountsListUseCase);
container
  .bind<GetDiscountByIdUseCase>(TYPES.GetDiscountByIdUseCase)
  .to(GetDiscountByIdUseCase);
container
  .bind<EditDiscountUseCase>(TYPES.EditDiscountUseCase)
  .to(EditDiscountUseCase);
container
  .bind<DeleteDiscountUseCase>(TYPES.DeleteDiscountUseCase)
  .to(DeleteDiscountUseCase);

// DashboardDataService
container
  .bind<DashboardDataService>(TYPES.DashboardDataService)
  .to(DashboardDataServiceImpl);

// DashboardDataRepository
container
  .bind<DashboardDataRepository>(TYPES.DashboardDataRepository)
  .to(DashboardDataRepositoryImpl);

// DashboardDataUseCases
container
  .bind<GetDashboardDataUseCase>(TYPES.GetDashboardDataUseCase)
  .to(GetDashboardDataUseCase);
container
  .bind<GetDailyAssistanceGraphicUseCase>(
    TYPES.GetDailyAssistanceGraphicUseCase
  )
  .to(GetDailyAssistanceGraphicUseCase);
container
  .bind<GetIncomeGraphicUseCase>(TYPES.GetIncomeGraphicUseCase)
  .to(GetIncomeGraphicUseCase);
container
  .bind<GetMembershipGraphicUseCase>(TYPES.GetMembershipGraphicUseCase)
  .to(GetMembershipGraphicUseCase);

export default container;
