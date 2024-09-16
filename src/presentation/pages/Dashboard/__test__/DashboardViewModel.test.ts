import "reflect-metadata";
import { TYPES } from "@/config/types";
import { renderHook, waitFor } from "@testing-library/react";
import ViewModel from "../ViewModel";
import container from "@/config/inversifyContainer";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import { BarGraphicValues } from "@/domain/models/BarGraphicValues";
import { PieGraphicValues } from "@/domain/models/PieGraphicValues";

const mockDashboardData: DashboardDataValues = {
  totalAthletes: 1,
  activeAthletes: 1,
  activeAthletesPercentage: 1,
  inactiveAthletes: 0,
  inactiveAthletesPercentage: 0,
  dailyAssistance: 1,
  newAthletesByMonth: 1,
  incomeByMonth: 1,
};

const mockGetDailyAssistanceGraphic: BarGraphicValues[] = [
  { time: new Date(), value: 1 },
  { time: new Date(), value: 2 },
];

const mockGetMembershipGraphic: PieGraphicValues[] = [
  { label: "label 1", value: 1 },
  { label: "label 2", value: 2 },
];

const mockGetIncomeGraphic: BarGraphicValues[] = [
  { time: new Date(), value: 1 },
  { time: new Date(), value: 2 },
];

// Mock the use cases
jest.mock("@/domain/useCases/Dashboard/getDashboardData");
jest.mock("@/domain/useCases/Dashboard/getDailyAssistanceGraphic");
jest.mock("@/domain/useCases/Dashboard/getMembershipGraphic");
jest.mock("@/domain/useCases/Dashboard/getIncomeGraphic");

describe("Dashboard ViewModel", () => {
  // Reset all mocks before each test
  jest.clearAllMocks();

  jest.spyOn(container, "get").mockImplementation((type) => {
    switch (type) {
      case TYPES.GetDashboardDataUseCase:
        return {
          execute: jest.fn().mockResolvedValue(mockDashboardData),
        };
      case TYPES.GetDailyAssistanceGraphicUseCase:
        return {
          execute: jest.fn().mockResolvedValue(mockGetDailyAssistanceGraphic),
        };
      case TYPES.GetMembershipGraphicUseCase:
        return {
          execute: jest.fn().mockResolvedValue(mockGetMembershipGraphic),
        };
      case TYPES.GetIncomeGraphicUseCase:
        return {
          execute: jest.fn().mockResolvedValue(mockGetIncomeGraphic),
        };
      default:
        return null;
    }
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should initialize with loading state", () => {
    const { result } = renderHook(() => ViewModel());
    expect(result.current.isLoading).toBe(true);

    waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.dashboardData).toEqual(mockDashboardData);
      expect(result.current.getDailyAssistanceGraphic).toEqual(
        mockGetDailyAssistanceGraphic
      );
      expect(result.current.getMembershipGraphic).toEqual(
        mockGetMembershipGraphic
      );
      expect(result.current.getIncomeGraphic).toEqual(mockGetIncomeGraphic);
    });
  });
});
