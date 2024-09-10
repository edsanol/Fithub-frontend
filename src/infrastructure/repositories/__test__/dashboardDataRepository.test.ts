import { TYPES } from "@/config/types";
import { DashboardDataRepository } from "@/domain/repositories/dashboardDataRepository";
import { DashboardDataService } from "@/domain/services/dashboardDataService";
import { Container } from "inversify";
import "reflect-metadata";
import { DashboardDataRepositoryImpl } from "../dashboardDataRepository";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import { BarGraphicValues } from "@/domain/models/BarGraphicValues";
import { PieGraphicValues } from "@/domain/models/PieGraphicValues";

const mockDashboardDataService = {
  getDashboardData: jest.fn(),
  getDailyAssistanceGraphic: jest.fn(),
  getIncomeGraphic: jest.fn(),
  getMembershipGraphic: jest.fn(),
};

describe("DashboardDataRepositoryImpl", () => {
  let dashboardDataRepository: DashboardDataRepository;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<DashboardDataService>(TYPES.DashboardDataService)
      .toConstantValue(
        mockDashboardDataService as unknown as DashboardDataService
      );
    container
      .bind<DashboardDataRepository>(TYPES.DashboardDataRepository)
      .to(DashboardDataRepositoryImpl);

    dashboardDataRepository = container.get<DashboardDataRepository>(
      TYPES.DashboardDataRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call getDashboardData in DashboardDataService", async () => {
    const mockDashboardData: DashboardDataValues = {
      totalAthletes: 10,
      activeAthletes: 5,
      activeAthletesPercentage: 50,
      inactiveAthletes: 5,
      inactiveAthletesPercentage: 50,
      dailyAssistance: 5,
      newAthletesByMonth: 5,
      incomeByMonth: 5,
    };

    mockDashboardDataService.getDashboardData.mockResolvedValue(
      mockDashboardData
    );

    const result = await dashboardDataRepository.getDashboardData();

    expect(mockDashboardDataService.getDashboardData).toHaveBeenCalled();
    expect(result).toEqual(mockDashboardData);
  });

  it("should call getDailyAssistanceGraphic in DashboardDataService", async () => {
    const mockBarGraphicValues: BarGraphicValues[] = [
      {
        time: new Date("01/01/2022"),
        value: 5,
      },
      {
        time: new Date("02/01/2022"),
        value: 10,
      },
    ];

    mockDashboardDataService.getDailyAssistanceGraphic.mockResolvedValue(
      mockBarGraphicValues
    );

    const result = await dashboardDataRepository.getDailyAssistanceGraphic(
      "2022-01-01",
      "2022-01-02"
    );

    expect(
      mockDashboardDataService.getDailyAssistanceGraphic
    ).toHaveBeenCalled();
    expect(result).toEqual(mockBarGraphicValues);
  });

  it("should call getIncomeGraphic in DashboardDataService", async () => {
    const mockBarGraphicValues: BarGraphicValues[] = [
      {
        time: new Date("01/01/2022"),
        value: 5,
      },
      {
        time: new Date("02/01/2022"),
        value: 10,
      },
    ];

    const startDate = "2021-01-01";
    const endDate = "2021-01-31";

    mockDashboardDataService.getIncomeGraphic.mockResolvedValue(
      mockBarGraphicValues
    );

    const result = await dashboardDataRepository.getIncomeGraphic(
      startDate,
      endDate
    );

    expect(mockDashboardDataService.getIncomeGraphic).toHaveBeenCalledWith(
      startDate,
      endDate
    );
    expect(result).toEqual(mockBarGraphicValues);
  });

  it("should call getMembershipGraphic in DashboardDataService", async () => {
    const mockPieGraphicValues: PieGraphicValues[] = [
      { label: "Basic", value: 60 },
      { label: "Premium", value: 40 },
    ];

    mockDashboardDataService.getMembershipGraphic.mockResolvedValue(
      mockPieGraphicValues
    );

    const result = await dashboardDataRepository.getMembershipGraphic();

    expect(mockDashboardDataService.getMembershipGraphic).toHaveBeenCalled();
    expect(result).toEqual(mockPieGraphicValues);
  });
});
