import "reflect-metadata";
import { TYPES } from "@/config/types";
import { DashboardDataService } from "@/domain/services/dashboardDataService";
import { HttpClient } from "@/infrastructure/api/http";
import { Container } from "inversify";
import { DashboardDataServiceImpl } from "../dashboardDataService";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import { BarGraphicValues } from "@/domain/models/BarGraphicValues";
import { PieGraphicValues } from "@/domain/models/PieGraphicValues";

const mockHttpClient = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
};

describe("DashboardDataServiceImpl", () => {
  let dashboardDataService: DashboardDataService;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<HttpClient>(TYPES.HttpClient)
      .toConstantValue(mockHttpClient as unknown as HttpClient);
    container
      .bind<DashboardDataService>(TYPES.DashboardDataService)
      .to(DashboardDataServiceImpl);

    dashboardDataService = container.get<DashboardDataService>(
      TYPES.DashboardDataService
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch dashboard data and return DashboardDataValues", async () => {
    const mockDashboardData: DashboardDataValues = {
      totalAthletes: 100,
      activeAthletes: 80,
      activeAthletesPercentage: 80,
      inactiveAthletes: 20,
      inactiveAthletesPercentage: 20,
      dailyAssistance: 50,
      newAthletesByMonth: 10,
      incomeByMonth: 1000,
    };

    mockHttpClient.get.mockResolvedValue({ data: mockDashboardData });

    const result = await dashboardDataService.getDashboardData();

    expect(mockHttpClient.get).toHaveBeenCalledWith("/Dashboard/GetDashboard");
    expect(result).toEqual(mockDashboardData);
  });

  it("should fetch daily assistance graphic and return BarGraphicValues array", async () => {
    const mockBarGraphicValues: BarGraphicValues[] = [
      { time: new Date("2021-01-01"), value: 10 },
      { time: new Date("2021-01-02"), value: 20 },
    ];

    const startDate = "2021-01-01";
    const endDate = "2021-01-31";

    mockHttpClient.get.mockResolvedValue({ data: mockBarGraphicValues });

    const result = await dashboardDataService.getDailyAssistanceGraphic(
      startDate,
      endDate
    );

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `/Dashboard/GetDailyAssistanceGraphic?startDate=${startDate}&endDate=${endDate}`
    );
    expect(result).toEqual(mockBarGraphicValues);
  });

  it("should fetch income graphic and return BarGraphicValues array", async () => {
    const mockBarGraphicValues: BarGraphicValues[] = [
      { time: new Date("2021-01-01"), value: 10 },
      { time: new Date("2021-01-02"), value: 20 },
    ];

    const startDate = "2021-01-01";
    const endDate = "2021-01-31";

    mockHttpClient.get.mockResolvedValue({ data: mockBarGraphicValues });

    const result = await dashboardDataService.getIncomeGraphic(
      startDate,
      endDate
    );

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `/Dashboard/GetIncomeGraphic?startDate=${startDate}&endDate=${endDate}`
    );
    expect(result).toEqual(mockBarGraphicValues);
  });

  it("should fetch membership graphic and return PieGraphicValues array", async () => {
    const mockPieGraphicValues: PieGraphicValues[] = [
      { label: "Basic", value: 60 },
      { label: "Premium", value: 40 },
    ];

    mockHttpClient.get.mockResolvedValue({ data: mockPieGraphicValues });

    const result = await dashboardDataService.getMembershipGraphic();

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      "/Dashboard/GetMembershipGraphic"
    );
    expect(result).toEqual(mockPieGraphicValues);
  });
});
