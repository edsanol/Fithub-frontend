import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CustomDashboardDoubleGraph from "../components/cards/CustomDashboardDoubleGraph";

jest.mock("@mui/x-charts/PieChart", () => ({
  __esModule: true,
  PieChart: (props: any) => (
    <div data-testid="pie-chart">{JSON.stringify(props)}</div>
  ),
}));

describe("CustomDashboardDoubleGraph", () => {
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

  it("should render the correct data when loading is false and dashboardData is available", () => {
    render(
      <CustomDashboardDoubleGraph dashboardData={mockData} loading={false} />
    );

    // Check if the correct values are rendered
    expect(screen.getByText("Usuarios Activos")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();

    expect(screen.getByText("Usuarios Inactivos")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    // Check if the PieChart is rendered
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
  });

  it("should not render the PieChart when activeAthletes and inactiveAthletes are 0", () => {
    const mockZeroData: DashboardDataValues = {
      totalAthletes: 0,
      activeAthletes: 0,
      activeAthletesPercentage: 0,
      inactiveAthletes: 0,
      inactiveAthletesPercentage: 0,
      dailyAssistance: 0,
      newAthletesByMonth: 0,
      incomeByMonth: 0,
    };

    render(
      <CustomDashboardDoubleGraph
        dashboardData={mockZeroData}
        loading={false}
      />
    );

    // Ensure that the PieChart is not rendered
    expect(screen.queryByTestId("pie-chart")).not.toBeInTheDocument();
  });
});
