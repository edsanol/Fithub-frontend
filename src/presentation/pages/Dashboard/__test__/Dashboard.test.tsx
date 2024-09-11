import ViewModel from "../ViewModel";
import { render, screen } from "@testing-library/react";
import Dashboard from "../View";

jest.mock("../ViewModel");

jest.mock("../components/cards/CustomDashboardGraph", () => () => (
  <div>CustomDashboardGraph</div>
));
jest.mock("../components/cards/CustomDashboardData", () => () => (
  <div>CustomDashboardData</div>
));
jest.mock("../components/cards/CustomDashboardDoubleGraph", () => () => (
  <div>CustomDashboardDoubleGraph</div>
));
jest.mock("@/presentation/components", () => ({
  CustomAreaGraph: () => <div>CustomAreaGraph</div>,
  CustomPieGraph: () => <div>CustomPieGraph</div>,
  CustomScaleGraph: () => <div>CustomScaleGraph</div>,
}));

describe("Dashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading skeletons when loading", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      isLoading: true,
      dashboardData: [],
      getDailyAssistanceGraphic: [],
      getMembershipGraphic: [],
      getIncomeGraphic: [],
    });

    render(<Dashboard />);

    expect(screen.getAllByText(/CustomDashboardData/i)).toBeTruthy();
    expect(screen.getAllByText(/CustomDashboardDoubleGraph/i)).toBeTruthy();
    expect(screen.getAllByText(/CustomDashboardGraph/i)).toBeTruthy();
  });

  it("displays the charts when data is available", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      isLoading: false,
      dashboardData: [],
      getDailyAssistanceGraphic: [{ id: 1, value: 100 }],
      getMembershipGraphic: [{ id: 1, value: 50 }],
      getIncomeGraphic: [{ id: 1, value: 1000 }],
    });

    render(<Dashboard />);

    expect(screen.getByText(/CustomAreaGraph/i)).toBeInTheDocument();
    expect(screen.getByText(/CustomPieGraph/i)).toBeInTheDocument();
    expect(screen.getByText(/CustomScaleGraph/i)).toBeInTheDocument();
  });
});
