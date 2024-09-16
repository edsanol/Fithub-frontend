import "reflect-metadata";
import { Container } from "inversify";
import { GymUserServiceImpl } from "../gymUserService";
import { HttpClient } from "@/infrastructure/api/http";
import { TYPES } from "@/config/types";
import { UserLogin } from "@/domain/entities/UserLogin";
import { GymUser } from "@/domain/entities/GymUser";
import { GymUserService } from "@/domain/services/gymUserService";

const mockHttpClient = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
};

describe("GymUserServiceImpl", () => {
  let gymUserService: GymUserService;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<HttpClient>(TYPES.HttpClient)
      .toConstantValue(mockHttpClient as unknown as HttpClient);
    container.bind<GymUserService>(TYPES.GymUserService).to(GymUserServiceImpl);

    gymUserService = container.get<GymUserService>(TYPES.GymUserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login gym user and return the GymUser data", async () => {
    const mockUserLogin: UserLogin = {
      email: "test@example.com",
      password: "password123",
    };

    const mockGymUser: GymUser = {
      gymName: "test gym",
      email: "test@mail.com",
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

    mockHttpClient.post.mockResolvedValue({ data: mockGymUser });

    const result = await gymUserService.loginGymUser(mockUserLogin);

    expect(mockHttpClient.post).toHaveBeenCalledWith("/Gym/Login", {
      email: mockUserLogin.email,
      password: mockUserLogin.password,
    });
    expect(result).toEqual(mockGymUser);
  });

  it("should register gym user and return true on success", async () => {
    const mockGymUser: GymUser = {
      gymName: "test gym",
      email: "test@mail.com",
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

    mockHttpClient.post.mockResolvedValue({ data: true });

    const result = await gymUserService.registerGymUser(mockGymUser);

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Gym/Register",
      mockGymUser
    );
    expect(result).toBe(true);
  });

  it("should edit gym user and return true on success", async () => {
    const mockGymUser: GymUser = {
      gymName: "test gym",
      email: "test@mail.com",
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

    mockHttpClient.put.mockResolvedValue({ data: true });

    const result = await gymUserService.editGymUser(mockGymUser);

    expect(mockHttpClient.put).toHaveBeenCalledWith("/Gym/Edit", mockGymUser);
    expect(result).toBe(true);
  });

  it("should get gym user by id", async () => {
    const mockGymUser: GymUser = {
      gymName: "test gym",
      email: "test@mail.com",
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

    mockHttpClient.get.mockResolvedValue({ data: mockGymUser });

    const result = await gymUserService.getGymUserById();

    expect(mockHttpClient.get).toHaveBeenCalledWith("/Gym/GymById");
    expect(result).toEqual(mockGymUser);
  });

  it("should change password and return true on success", async () => {
    const mockResetPassword = {
      email: "test@mail.com",
      newPassword: "newPassword123",
    };

    mockHttpClient.post.mockResolvedValue({ data: true });

    const result = await gymUserService.changePassword(mockResetPassword);

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Gym/ChangePassword",
      mockResetPassword
    );
    expect(result).toBe(true);
  });

  it("should recover password and return true on success", async () => {
    const mockResetPassword = {
      email: "test@mail.com",
      newPassword: "newPassword123",
    };

    mockHttpClient.post.mockResolvedValue({ data: true });

    const result = await gymUserService.recoverPassword(mockResetPassword);

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Gym/RecoverPassword",
      mockResetPassword
    );
    expect(result).toBe(true);
  });

  it("should reset password and return true on success", async () => {
    const mockResetPassword = {
      email: "test@mail.com",
      newPassword: "newPassword123",
    };

    mockHttpClient.post.mockResolvedValue({ data: true });

    const result = await gymUserService.resetPassword(mockResetPassword);

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Gym/ResetPassword",
      mockResetPassword
    );
    expect(result).toBe(true);
  });
});
