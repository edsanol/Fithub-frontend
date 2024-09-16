import { render, screen } from "@testing-library/react";
import { Navbar } from "../components";

jest.mock("../components/ButtonLogin", () => () => (
  <div>Mocked ButtonLogin</div>
));

describe("Navbar Component", () => {
  it("should render the title correctly", () => {
    render(<Navbar />);

    expect(screen.getByText("FitHub")).toBeInTheDocument();
  });
});
