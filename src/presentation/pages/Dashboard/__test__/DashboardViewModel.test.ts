import "reflect-metadata";
import { TYPES } from "@/config/types";
import { renderHook, waitFor } from "@testing-library/react";
import ViewModel from "../ViewModel";
import container from "@/config/inversifyContainer";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import { BarGraphicValues } from "@/domain/models/BarGraphicValues";
import { PieGraphicValues } from "@/domain/models/PieGraphicValues";
import { AthleteAssistance } from "@/domain/models/AthleteAssistance";
import { AthleteBirthDate } from "@/domain/models/AthleteBirthDate";

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

const mockAthleteAssistance: AthleteAssistance[] = [
  {
    athleteId: 1,
    athleteName: "John",
    athleteLastName: "Doe",
    email: "john.doe@example.com",
    dateAssistence: "2024-10-25",
    timeAssistence: "08:30",
  },
  {
    athleteId: 2,
    athleteName: "Jane",
    athleteLastName: "Smith",
    email: "jane.smith@example.com",
    dateAssistence: "2024-10-25",
    timeAssistence: "09:00",
  },
];

const mockAthleteBirthDate: AthleteBirthDate[] = [
  {
    athleteId: 1,
    athleteName: "John",
    athleteLastName: "Doe",
    birthDate: "2000-05-15",
    age: 24,
  },
  {
    athleteId: 2,
    athleteName: "Jane",
    athleteLastName: "Smith",
    birthDate: "1998-11-22",
    age: 26,
  },
];

// Mock the use cases
jest.mock("@/domain/useCases/Dashboard/getDashboardData");
jest.mock("@/domain/useCases/Dashboard/getDailyAssistanceGraphic");
jest.mock("@/domain/useCases/Dashboard/getMembershipGraphic");
jest.mock("@/domain/useCases/Dashboard/getIncomeGraphic");
jest.mock("@/domain/useCases/Dashboard/getAthleteAssistanceUseCase");
jest.mock("@/domain/useCases/Dashboard/getAthleteBirthDateUseCase");

describe("Dashboard ViewModel", () => {
  beforeEach(() => {
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
        case TYPES.GetAthleteAssistanceUseCase:
          return {
            execute: jest.fn().mockResolvedValue({
              items: mockAthleteAssistance,
              totalRecords: mockAthleteAssistance.length,
            }),
          };
        case TYPES.GetAthleteBirthDateUseCase:
          return {
            execute: jest.fn().mockResolvedValue(mockAthleteBirthDate),
          };
        default:
          return null;
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should initialize with loading state", async () => {
    const { result } = renderHook(() => ViewModel());
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.dashboardData).toEqual(mockDashboardData);
    expect(result.current.getDailyAssistanceGraphic).toEqual(
      mockGetDailyAssistanceGraphic
    );
    expect(result.current.getMembershipGraphic).toEqual(
      mockGetMembershipGraphic
    );
    expect(result.current.getIncomeGraphic).toEqual(mockGetIncomeGraphic);
    expect(result.current.athleteAssistance).toEqual(mockAthleteAssistance);
    expect(result.current.athleteBirthDate).toEqual(mockAthleteBirthDate);
  });
});
