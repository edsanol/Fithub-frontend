import "reflect-metadata";
import { TYPES } from "@/config/types";
import { AthleteUserService } from "@/domain/services/athleteUserService";
import { HttpClient } from "@/infrastructure/api/http";
import { Container } from "inversify";
import { AthleteUserServiceImpl } from "../athleteUserService";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { PaginateData } from "@/domain/models/PaginateData";
import { MeasurementsProgress } from "@/domain/entities/MeasurementsProgress";

const mockHttpClient = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
};

describe("AthleteUserServiceImpl", () => {
  let athleteUserService: AthleteUserService;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<HttpClient>(TYPES.HttpClient)
      .toConstantValue(mockHttpClient as unknown as HttpClient);
    container
      .bind<AthleteUserService>(TYPES.AthleteUserService)
      .to(AthleteUserServiceImpl);

    athleteUserService = container.get<AthleteUserService>(
      TYPES.AthleteUserService
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register athlete user and return true on success", async () => {
    const mockAthleteUser: AthleteUser = {
      athleteName: "test athlete",
      athleteLastName: "test athlete last name",
      email: "test@mail.com",
      phoneNumber: "123456789",
      birthDate: "2021-01-01",
      genre: "Masculino",
      cardAccessCode: "123456",
      registerDate: "2021-01-01",
      status: true,
      idGym: 1,
      gymName: "test gym",
      stateAthlete: "active",
      token: "test token",
      refreshToken: "test refresh token",
      startDate: "2021-01-01",
      endDate: "2021-01-01",
      membershipName: "basic",
      cost: 100,
      membershipId: 1,
    };

    mockHttpClient.post.mockResolvedValue({ data: true });

    const result = await athleteUserService.registerAthleteUser(
      mockAthleteUser
    );

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Athlete/Register",
      mockAthleteUser
    );
    expect(result).toBe(true);
  });

  it("should get athlete user list and return AthleteUser List on success", async () => {
    const mockPaginateData: PaginateData = {
      numPage: 1,
      numRecordsPage: 10,
    };

    const mockPaginateResponseList = {
      data: [
        {
          athleteName: "test athlete",
          athleteLastName: "test athlete last name",
          email: "test@mail.com",
          phoneNumber: "123456789",
          birthDate: "2021-01-01",
          genre: "Masculino",
          cardAccessCode: "123456",
          registerDate: "2021-01-01",
          status: true,
          idGym: 1,
          gymName: "test gym",
          stateAthlete: "active",
          token: "test token",
          refreshToken: "test refresh token",
          startDate: "2021-01-01",
          endDate: "2021-01-01",
          membershipName: "basic",
          cost: 100,
          membershipId: 1,
        },
      ],
    };

    mockHttpClient.post.mockResolvedValue({ data: mockPaginateResponseList });

    const result = await athleteUserService.getAthleteUserList(
      mockPaginateData
    );

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Athlete/List",
      mockPaginateData
    );
    expect(result).toEqual(mockPaginateResponseList);
  });

  it("should get athlete user by id and return AthleteUser", async () => {
    const mockAthleteUser: AthleteUser = {
      athleteId: 1,
      athleteName: "test athlete",
      athleteLastName: "test athlete last name",
      email: "test@mail.com",
      phoneNumber: "123456789",
      birthDate: "2021-01-01",
      genre: "Masculino",
      cardAccessCode: "123456",
      registerDate: "2021-01-01",
      status: true,
      idGym: 1,
      gymName: "test gym",
      stateAthlete: "active",
      token: "test token",
      refreshToken: "test refresh token",
      startDate: "2021-01-01",
      endDate: "2021-01-01",
      membershipName: "basic",
      cost: 100,
      membershipId: 1,
    };

    mockHttpClient.get.mockResolvedValue({ data: mockAthleteUser });

    const result = await athleteUserService.getAthleteUserById(1);

    expect(mockHttpClient.get).toHaveBeenCalledWith("/Athlete/1");
    expect(result).toEqual(mockAthleteUser);
    expect(mockAthleteUser.athleteId).toBe(1);
  });

  it("should edit athlete user and return true on success", async () => {
    const mockAthleteUser: AthleteUser = {
      athleteId: 1,
      athleteName: "test athlete",
      athleteLastName: "test athlete last name",
      email: "test@mail.com",
      phoneNumber: "123456789",
      birthDate: "2021-01-01",
      genre: "Masculino",
      cardAccessCode: "123456",
      registerDate: "2021-01-01",
      status: true,
      idGym: 1,
      gymName: "test gym",
      stateAthlete: "active",
      token: "test token",
      refreshToken: "test refresh token",
      startDate: "2021-01-01",
      endDate: "2021-01-01",
      membershipName: "basic",
      cost: 100,
      membershipId: 1,
    };

    mockHttpClient.put.mockResolvedValue({ data: true });

    const result = await athleteUserService.editAthleteUser(1, mockAthleteUser);

    expect(mockHttpClient.put).toHaveBeenCalledWith(
      "/Athlete/Edit/1",
      mockAthleteUser
    );
    expect(result).toBe(true);
    expect(mockAthleteUser.athleteId).toBe(1);
  });

  it("should delete athlete user and return true on success", async () => {
    mockHttpClient.put.mockResolvedValue({ data: true });

    const result = await athleteUserService.deleteAthleteUser(1);

    expect(mockHttpClient.put).toHaveBeenCalledWith("/Athlete/Delete/1", null);
    expect(result).toBe(true);
  });

  it("should update membership for athlete and return true on success", async () => {
    const mockUpdateMembership = {
      athleteId: 1,
      membershipId: 2,
    };

    mockHttpClient.post.mockResolvedValue({ data: true });

    const result = await athleteUserService.updateMembershipToAthlete(
      mockUpdateMembership
    );

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Athlete/UpdateMembershipToAthlete",
      mockUpdateMembership
    );
    expect(result).toBe(true);
  });

  it("should create measurement progress and return true on success", async () => {
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
    };

    mockHttpClient.post.mockResolvedValue({ data: true });

    const result = await athleteUserService.createMeasurementProgress(
      mockMeasurementsProgress
    );

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Athlete/RecordMeasurementProgress",
      mockMeasurementsProgress
    );
    expect(result).toBe(true);
  });

  it("should get measurement progress list and return MeasurementsProgress list", async () => {
    const mockPaginateData: PaginateData = {
      numPage: 1,
      numRecordsPage: 10,
    };

    const mockPaginateResponseList = {
      data: [
        {
          athleteId: 1,
          date: "2021-01-01",
          measurements: [
            {
              muscle: "biceps",
              measurement: 30,
            },
          ],
        },
      ],
    };

    mockHttpClient.post.mockResolvedValue({ data: mockPaginateResponseList });

    const result = await athleteUserService.getMeasurementProgressList(
      1,
      mockPaginateData
    );

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Athlete/GetMeasurementProgressList?athleteID=1",
      mockPaginateData
    );
    expect(result).toEqual(mockPaginateResponseList);
  });

  it("should get measurement progress by last month and return list", async () => {
    const mockMeasurementProgressByLastMonth = [
      {
        athleteId: 1,
        date: "2021-01-01",
        measurements: [
          {
            muscle: "biceps",
            measurement: 30,
          },
        ],
      },
    ];

    mockHttpClient.get.mockResolvedValue({
      data: mockMeasurementProgressByLastMonth,
    });

    const result = await athleteUserService.getMeasurementProgressByLastMonth(
      1
    );

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      "/Athlete/GetMeasurementsByLastMonth?athleteID=1"
    );
    expect(result).toEqual(mockMeasurementProgressByLastMonth);
  });

  it("should get measurements graphic data and return BarGraphicValues list", async () => {
    const mockBarGraphicValues = [
      {
        label: "biceps",
        value: 30,
      },
    ];

    mockHttpClient.get.mockResolvedValue({ data: mockBarGraphicValues });

    const result = await athleteUserService.getMeasurementsGraphic(
      1,
      "biceps",
      "2021-01-01",
      "2021-01-31"
    );

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      "/Athlete/GetMeasurementsGraphic?athleteID=1&muscle=biceps&startDate=2021-01-01&endDate=2021-01-31"
    );
    expect(result).toEqual(mockBarGraphicValues);
  });
});
