import "reflect-metadata";
import { TYPES } from "@/config/types";
import { GymUserRepository } from "@/domain/repositories/gymUserRepository";
import { GymUserService } from "@/domain/services/gymUserService";
import { Container } from "inversify";
import "reflect-metadata";
import { GymUserRepositoryImpl } from "../gymUserRepository";
import { UserLogin } from "@/domain/entities/UserLogin";
import { GymUser } from "@/domain/entities/GymUser";
import { ResetPassword } from "@/domain/models/ResetPassword";

const mockGymUserService = {
  loginGymUser: jest.fn(),
  registerGymUser: jest.fn(),
  editGymUser: jest.fn(),
  getGymUserById: jest.fn(),
  changePassword: jest.fn(),
  recoverPassword: jest.fn(),
  resetPassword: jest.fn(),
};

describe("GymUserRepositoryImpl", () => {
  let gymUserRepository: GymUserRepository;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<GymUserService>(TYPES.GymUserService)
      .toConstantValue(mockGymUserService as unknown as GymUserService);
    container
      .bind<GymUserRepository>(TYPES.GymUserRepository)
      .to(GymUserRepositoryImpl);

    gymUserRepository = container.get<GymUserRepository>(
      TYPES.GymUserRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call loginGymUser in GymUserService", async () => {
    const mockUserLogin: UserLogin = {
      email: "test@example.com",
      password: "password123",
    };

    const mockGymUser: GymUser = {
      gymName: "test gym",
      email: "test@example.com",
      password: "password123",
      address: "test address",
      phoneNumber: "123456789",
      registerDate: "2021-01-01",
      subscriptionPlan: "basic",
      comments: "test comments",
      nit: "123456789",
      token: "test token",
      refreshToken: "test refresh token",
      stateGym: "active",
      status: true,
      memberNumber: 123,
    };

    mockGymUserService.loginGymUser.mockResolvedValue(mockGymUser);

    const result = await gymUserRepository.loginGymUser(mockUserLogin);

    expect(mockGymUserService.loginGymUser).toHaveBeenCalledWith(mockUserLogin);
    expect(result).toEqual(mockGymUser);
  });

  it("should call registerGymUser in GymUserService", async () => {
    const mockGymUser: GymUser = {
      gymName: "test gym",
      email: "test@example.com",
      password: "password123",
      address: "test address",
      phoneNumber: "123456789",
      registerDate: "2021-01-01",
      subscriptionPlan: "basic",
      comments: "test comments",
      nit: "123456789",
      token: "test token",
      refreshToken: "test refresh token",
      stateGym: "active",
      status: true,
      memberNumber: 123,
    };

    mockGymUserService.registerGymUser.mockResolvedValue(true);

    const result = await gymUserRepository.registerGymUser(mockGymUser);

    expect(mockGymUserService.registerGymUser).toHaveBeenCalledWith(
      mockGymUser
    );
    expect(result).toBe(true);
  });

  it("should call editGymUser in GymUserService", async () => {
    const mockGymUser: GymUser = {
      gymName: "test gym",
      email: "test@example.com",
      password: "password123",
      address: "test address",
      phoneNumber: "123456789",
      registerDate: "2021-01-01",
      subscriptionPlan: "basic",
      comments: "test comments",
      nit: "123456789",
      token: "test token",
      refreshToken: "test refresh token",
      stateGym: "active",
      status: true,
      memberNumber: 123,
    };

    mockGymUserService.editGymUser.mockResolvedValue(true);

    const result = await gymUserRepository.editGymUser(mockGymUser);

    expect(mockGymUserService.editGymUser).toHaveBeenCalledWith(mockGymUser);
    expect(result).toBe(true);
  });

  it("should call getGymUserById in GymUserService", async () => {
    const mockGymUser: GymUser = {
      gymName: "test gym",
      email: "test@example.com",
      password: "password123",
      address: "test address",
      phoneNumber: "123456789",
      registerDate: "2021-01-01",
      subscriptionPlan: "basic",
      comments: "test comments",
      nit: "123456789",
      token: "test token",
      refreshToken: "test refresh token",
      stateGym: "active",
      status: true,
      memberNumber: 123,
    };

    mockGymUserService.getGymUserById.mockResolvedValue(mockGymUser);

    const result = await gymUserRepository.getGymUserById();

    expect(mockGymUserService.getGymUserById).toHaveBeenCalled();
    expect(result).toEqual(mockGymUser);
  });

  it("should call changePassword in GymUserService", async () => {
    const mockResetPassword: ResetPassword = {
      newPassword: "newPassword123",
      confirmPassword: "newPassword123",
      token: "test token",
    };

    mockGymUserService.changePassword.mockResolvedValue(true);

    const result = await gymUserRepository.changePassword(mockResetPassword);

    expect(mockGymUserService.changePassword).toHaveBeenCalledWith(
      mockResetPassword
    );
    expect(result).toBe(true);
  });

  it("should call recoverPassword in GymUserService", async () => {
    const mockResetPassword: ResetPassword = {
      newPassword: "newPassword123",
      confirmPassword: "newPassword123",
      token: "test token",
    };

    mockGymUserService.recoverPassword.mockResolvedValue(true);

    const result = await gymUserRepository.recoverPassword(mockResetPassword);

    expect(mockGymUserService.recoverPassword).toHaveBeenCalledWith(
      mockResetPassword
    );
    expect(result).toBe(true);
  });

  it("should call resetPassword in GymUserService", async () => {
    const mockResetPassword: ResetPassword = {
      newPassword: "newPassword123",
      confirmPassword: "newPassword123",
      token: "test token",
    };

    mockGymUserService.resetPassword.mockResolvedValue(true);

    const result = await gymUserRepository.resetPassword(mockResetPassword);

    expect(mockGymUserService.resetPassword).toHaveBeenCalledWith(
      mockResetPassword
    );
    expect(result).toBe(true);
  });
});
