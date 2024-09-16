import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CustomDashboardGraph from "../components/cards/CustomDashboardGraph";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";

jest.mock("@mui/x-charts/PieChart", () => ({
  __esModule: true,
  PieChart: (props: any) => <div data-testid="pie-chart">{props.children}</div>,
}));

jest.mock("@mui/x-charts/hooks", () => ({
  useDrawingArea: jest.fn(() => ({
    width: 100,
    height: 100,
    left: 0,
    top: 0,
  })),
}));

describe("CustomDashboardGraph", () => {
  const mockData: DashboardDataValues = {
    totalAthletes: 100,
    activeAthletes: 90,
    activeAthletesPercentage: 10,
    inactiveAthletes: 10,
    inactiveAthletesPercentage: 10,
    dailyAssistance: 10,
    newAthletesByMonth: 20,
    incomeByMonth: 1000,
  };

  it("should render the correct data and PieChart when loading is false and dashboardData is available", () => {
    render(<CustomDashboardGraph dashboardData={mockData} loading={false} />);

    expect(screen.getByText("Asistencia Diaria")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();

    expect(screen.getByText("11%")).toBeInTheDocument();
  });

  it("should not render PieChart when dailyAssistance is 0", () => {
    const mockZeroAssistanceData: DashboardDataValues = {
      ...mockData,
      dailyAssistance: 0,
    };

    render(
      <CustomDashboardGraph
        dashboardData={mockZeroAssistanceData}
        loading={false}
      />
    );

    expect(screen.queryByTestId("pie-chart")).not.toBeInTheDocument();
  });

  it("should not render any data when dashboardData is undefined and loading is false", () => {
    render(<CustomDashboardGraph dashboardData={undefined} loading={false} />);

    expect(screen.queryByText("Asistencia Diaria")).toBeInTheDocument();
    expect(screen.queryByText("50")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pie-chart")).toBeInTheDocument();
  });
});
