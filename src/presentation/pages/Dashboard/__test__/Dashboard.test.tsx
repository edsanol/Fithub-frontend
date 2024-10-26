import ViewModel from "../ViewModel";
import { render, screen } from "@testing-library/react";
import Dashboard from "../View";

jest.mock("../ViewModel");

jest.mock("../components/cards/CustomDashboardGraph", () => {
  const MockCustomDashboardGraph = () => <div>CustomDashboardGraph</div>;
  MockCustomDashboardGraph.displayName = "CustomDashboardGraph";
  return MockCustomDashboardGraph;
});

jest.mock("../components/cards/CustomDashboardData", () => {
  const MockCustomDashboardData = () => <div>CustomDashboardData</div>;
  MockCustomDashboardData.displayName = "CustomDashboardData";
  return MockCustomDashboardData;
});

jest.mock("../components/cards/CustomDashboardDoubleGraph", () => {
  const MockCustomDashboardDoubleGraph = () => (
    <div>CustomDashboardDoubleGraph</div>
  );
  MockCustomDashboardDoubleGraph.displayName = "CustomDashboardDoubleGraph";
  return MockCustomDashboardDoubleGraph;
});

jest.mock("@/presentation/components", () => ({
  CustomAreaGraph: () => <div>CustomAreaGraph</div>,
  CustomPieGraph: () => <div>CustomPieGraph</div>,
  CustomScaleGraph: () => <div>CustomScaleGraph</div>,
  FormDatePicker: () => <div>FormDatePicker</div>,
  FormInput: () => <div>FormInput</div>,
  PrimaryButton: () => <div>PrimaryButton</div>,
  SecondaryButton: () => <div>SecondaryButton</div>,
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
      athleteBirthDate: [], // Definir como array vacío
      athleteAssistance: [],
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
      athleteBirthDate: [], // Definir como array vacío
      athleteAssistance: [],
    });

    render(<Dashboard />);

    expect(screen.getByText(/CustomAreaGraph/i)).toBeInTheDocument();
    expect(screen.getByText(/CustomPieGraph/i)).toBeInTheDocument();
    expect(screen.getByText(/CustomScaleGraph/i)).toBeInTheDocument();
  });
});
