import { render, screen } from "@testing-library/react";
import GymProfile from "../View";

jest.mock("@/presentation/components", () => ({
  DashboardHeader: jest.fn(() => <div data-testid="dashboard-header" />),
}));

jest.mock("../gym-profile-form/GymProfileForm", () =>
  jest.fn(() => <div data-testid="gym-profile-form" />)
);

describe("GymProfile", () => {
  beforeEach(() => {
    render(<GymProfile />);
  });

  it("renders the GymProfile component", () => {
    expect(screen.getByTestId("dashboard-header")).toBeInTheDocument();
    expect(screen.getByTestId("gym-profile-form")).toBeInTheDocument();
  });
});
