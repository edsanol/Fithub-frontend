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

export default container;
