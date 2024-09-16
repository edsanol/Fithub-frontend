import "reflect-metadata";
import { AthleteUserRepositoryImpl } from "../athleteUserRepository";
import { Container } from "inversify";
import { AthleteUserService } from "@/domain/services/athleteUserService";
import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { PaginateData } from "@/domain/models/PaginateData";
import { UpdateMembershipToAthlete } from "@/domain/models/UpdateMembershipToAthlete";
import { MeasurementsProgress } from "@/domain/entities/MeasurementsProgress";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { MeasurementProgressByLastMonth } from "@/domain/models/MeasurementProgressByLastMonth";
import { BarGraphicValues } from "@/domain/models/BarGraphicValues";

const mockAthleteUserService = {
  registerAthleteUser: jest.fn(),
  getAthleteUserList: jest.fn(),
  getAthleteUserById: jest.fn(),
  editAthleteUser: jest.fn(),
  deleteAthleteUser: jest.fn(),
  updateMembershipToAthlete: jest.fn(),
  createMeasurementProgress: jest.fn(),
  getMeasurementProgressList: jest.fn(),
  getMeasurementProgressByLastMonth: jest.fn(),
  getMeasurementsGraphic: jest.fn(),
};

describe("AthleteUserRepositoryImpl", () => {
  let athleteUserRepository: AthleteUserRepository;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<AthleteUserService>(TYPES.AthleteUserService)
      .toConstantValue(mockAthleteUserService as unknown as AthleteUserService);
    container
      .bind<AthleteUserRepository>(TYPES.AthleteUserRepository)
      .to(AthleteUserRepositoryImpl);

    athleteUserRepository = container.get<AthleteUserRepository>(
      TYPES.AthleteUserRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call registerAthleteUser in AthleteUserService", async () => {
    const mockAthleteUser: AthleteUser = {
      athleteName: "John",
      athleteLastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      birthDate: "2000-01-01",
      genre: "Male",
      cardAccessCode: "ABC123",
      registerDate: "2022-01-01",
      status: true,
      idGym: 1,
      gymName: "Gym",
      stateAthlete: "active",
      token: "token",
      refreshToken: "refreshToken",
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      membershipName: "Basic",
      cost: 100,
      membershipId: 1,
    };

    mockAthleteUserService.registerAthleteUser.mockResolvedValue(true);

    const result = await athleteUserRepository.registerAthleteUser(
      mockAthleteUser
    );

    expect(mockAthleteUserService.registerAthleteUser).toHaveBeenCalledWith(
      mockAthleteUser
    );
    expect(result).toBe(true);
  });

  it("should call getAthleteUserList in AthleteUserService", async () => {
    const mockPaginateData: PaginateData = {
      numPage: 1,
      numRecordsPage: 10,
    };

    const mockResponse = {
      data: [],
      totalRecords: 0,
    };

    mockAthleteUserService.getAthleteUserList.mockResolvedValue(mockResponse);

    const result = await athleteUserRepository.getAthleteUserList(
      mockPaginateData
    );

    expect(mockAthleteUserService.getAthleteUserList).toHaveBeenCalledWith(
      mockPaginateData
    );
    expect(result).toEqual(mockResponse);
  });

  it("should call getAthleteUserById in AthleteUserService", async () => {
    const mockAthleteUser: AthleteUser = {
      athleteName: "John",
      athleteLastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      birthDate: "2000-01-01",
      genre: "Male",
      cardAccessCode: "ABC123",
      registerDate: "2022-01-01",
      status: true,
      idGym: 1,
      gymName: "Gym",
      stateAthlete: "active",
      token: "token",
      refreshToken: "refreshToken",
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      membershipName: "Basic",
      cost: 100,
      membershipId: 1,
    };

    mockAthleteUserService.getAthleteUserById.mockResolvedValue(
      mockAthleteUser
    );

    const result = await athleteUserRepository.getAthleteUserById(1);

    expect(mockAthleteUserService.getAthleteUserById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockAthleteUser);
  });

  it("should call editAthleteUser in AthleteUserService", async () => {
    const mockAthleteUser: AthleteUser = {
      athleteName: "John",
      athleteLastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      birthDate: "2000-01-01",
      genre: "Male",
      cardAccessCode: "ABC123",
      registerDate: "2022-01-01",
      status: true,
      idGym: 1,
      gymName: "Gym",
      stateAthlete: "active",
      token: "token",
      refreshToken: "refreshToken",
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      membershipName: "Basic",
      cost: 100,
      membershipId: 1,
    };

    mockAthleteUserService.editAthleteUser.mockResolvedValue(true);

    const result = await athleteUserRepository.editAthleteUser(
      1,
      mockAthleteUser
    );

    expect(mockAthleteUserService.editAthleteUser).toHaveBeenCalledWith(
      1,
      mockAthleteUser
    );
    expect(result).toBe(true);
  });

  it("should call deleteAthleteUser in AthleteUserService", async () => {
    mockAthleteUserService.deleteAthleteUser.mockResolvedValue(true);

    const result = await athleteUserRepository.deleteAthleteUser(1);

    expect(mockAthleteUserService.deleteAthleteUser).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });

  it("should call updateMembershipToAthlete in AthleteUserService", async () => {
    const mockUpdateMembership: UpdateMembershipToAthlete = {
      athleteId: 1,
      membershipId: 2,
    };

    mockAthleteUserService.updateMembershipToAthlete.mockResolvedValue(true);

    const result = await athleteUserRepository.updateMembershipToAthlete(
      mockUpdateMembership
    );

    expect(
      mockAthleteUserService.updateMembershipToAthlete
    ).toHaveBeenCalledWith(mockUpdateMembership);
    expect(result).toBe(true);
  });

  it("should call createMeasurementProgress in AthleteUserService", async () => {
    const mockMeasurementsProgress: MeasurementsProgress = {
      idAthlete: 1,
      gluteus: 1,
      biceps: 1,
      chest: 1,
      waist: 1,
      thigh: 1,
      calf: 1,
      shoulders: 1,
      forearm: 1,
      height: 1,
      weight: 1,
      date: new Date().toISOString(),
    };

    mockAthleteUserService.createMeasurementProgress.mockResolvedValue(true);

    const result = await athleteUserRepository.createMeasurementProgress(
      mockMeasurementsProgress
    );

    expect(
      mockAthleteUserService.createMeasurementProgress
    ).toHaveBeenCalledWith(mockMeasurementsProgress);
    expect(result).toBe(true);
  });

  it("should call getMeasurementProgressList in AthleteUserService", async () => {
    const mockPaginateData: PaginateData = {
      numPage: 1,
      numRecordsPage: 10,
    };

    const mockResponse: PaginateResponseList<MeasurementsProgress> = {
      totalRecords: 1,
      items: [
        {
          idAthlete: 1,
          gluteus: 1,
          biceps: 1,
          chest: 1,
          waist: 1,
          thigh: 1,
          calf: 1,
          shoulders: 1,
          forearm: 1,
          height: 1,
          weight: 1,
          date: new Date().toISOString(),
        },
      ],
    };

    mockAthleteUserService.getMeasurementProgressList.mockResolvedValue(
      mockResponse
    );

    const result = await athleteUserRepository.getMeasurementProgressList(
      1,
      mockPaginateData
    );

    expect(
      mockAthleteUserService.getMeasurementProgressList
    ).toHaveBeenCalledWith(1, mockPaginateData);
    expect(result).toEqual(mockResponse);
  });

  it("should call getMeasurementProgressByLastMonth in AthleteUserService", async () => {
    const mockResponse: MeasurementProgressByLastMonth[] = [
      {
        muscle: "Biceps",
        progress: 1,
        measurement: 1,
        progressPercentage: 1,
      },
    ];

    mockAthleteUserService.getMeasurementProgressByLastMonth.mockResolvedValue(
      mockResponse
    );

    const result =
      await athleteUserRepository.getMeasurementProgressByLastMonth(1);

    expect(
      mockAthleteUserService.getMeasurementProgressByLastMonth
    ).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockResponse);
  });

  it("should call getMeasurementsGraphic in AthleteUserService", async () => {
    const mockBarGraphicValues: BarGraphicValues[] = [
      { time: new Date("2021-01-01"), value: 1 },
      { time: new Date("2021-01-02"), value: 2 },
      { time: new Date("2021-01-03"), value: 3 },
    ];

    const athleteID = 1;
    const muscle = "biceps";
    const startDate = "2021-01-01";
    const endDate = "2021-01-31";

    mockAthleteUserService.getMeasurementsGraphic.mockResolvedValue(
      mockBarGraphicValues
    );

    const result = await athleteUserRepository.getMeasurementsGraphic(
      athleteID,
      muscle,
      startDate,
      endDate
    );

    expect(mockAthleteUserService.getMeasurementsGraphic).toHaveBeenCalledWith(
      athleteID,
      muscle,
      startDate,
      endDate
    );
    expect(result).toEqual(mockBarGraphicValues);
  });
});
