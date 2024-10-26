import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CustomDashboardData from "../components/cards/CustomDashboardData";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

jest.mock("@/assets/svg/user.svg", () => "/mocked-user.svg");

describe("CustomDashboardData", () => {
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

  it("should render the correct data when loading is false", () => {
    render(<CustomDashboardData data={mockData} loading={false} />);

    // Check if the correct values are rendered
    expect(screen.getByText("Total Usuarios")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();

    expect(screen.getByText("Nuevos Usuarios del mes")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("should not render data when data is undefined", () => {
    render(<CustomDashboardData data={undefined} loading={false} />);

    // Ensure that the component doesn't render user data when `data` is undefined
    expect(screen.queryByText("100")).not.toBeInTheDocument();
    expect(screen.queryByText("20")).not.toBeInTheDocument();
  });
});
