/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import LandingPage from "../View";

jest.mock("../components/Navbar", () => () => <div>Mocked Navbar</div>);
jest.mock("../components/Hero", () => () => <div>Mocked Hero</div>);
jest.mock("../components/Features", () => () => <div>Mocked Features</div>);
jest.mock("../components/HowItWorks", () => () => <div>Mocked HowItWorks</div>);
jest.mock("../components/CallToAction", () => () => (
  <div>Mocked CallToAction</div>
));
jest.mock("../components/Footer", () => () => <div>Mocked Footer</div>);

describe("LandingPage Component", () => {
  it("should render the main layout and components", () => {
    render(<LandingPage />);

    expect(screen.getByText("Mocked Navbar")).toBeInTheDocument();
    expect(screen.getByText("Mocked Hero")).toBeInTheDocument();
    expect(screen.getByText("Mocked Features")).toBeInTheDocument();
    expect(screen.getByText("Mocked HowItWorks")).toBeInTheDocument();
    expect(screen.getByText("Mocked CallToAction")).toBeInTheDocument();
    expect(screen.getByText("Mocked Footer")).toBeInTheDocument();
  });

  it("should have the correct background gradient", () => {
    const { container } = render(<LandingPage />);

    const main = container.querySelector("main");
    expect(main).toHaveClass(
      "bg-gradient-to-tr from-[#0F1117] from-40% to-[#130C36]"
    );
  });

  it("should have the full-screen height for the container", () => {
    const { container } = render(<LandingPage />);

    expect(container.firstChild).toHaveClass("w-full h-screen");
  });
});
