import { render, screen } from "@testing-library/react";
import { Hero } from "../components";

jest.mock("@/assets/svg/ArrowDownIcon", () => () => (
  <div>Mocked ArrowDownIcon</div>
));
jest.mock("@/assets/svg/GearIcon", () => () => <div>Mocked GearIcon</div>);
jest.mock("next/image", () => ({
  __esModule: true,
  default: jest.fn(() => <img alt="mocked image" />),
}));

describe("Hero Component", () => {
  it("should render the main elements correctly", () => {
    render(<Hero />);

    expect(screen.getByText("Transforma tu gimnasio")).toBeInTheDocument();
    expect(screen.getByText("FitHub Connect")).toBeInTheDocument();

    expect(
      screen.getByText("Maximiza tu eficiencia y éxito en la gestión fitness.")
    ).toBeInTheDocument();

    expect(screen.getByText("Mocked GearIcon")).toBeInTheDocument();
    expect(screen.getByText("Mocked ArrowDownIcon")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Comencemos/i })
    ).toBeInTheDocument();
  });
});
