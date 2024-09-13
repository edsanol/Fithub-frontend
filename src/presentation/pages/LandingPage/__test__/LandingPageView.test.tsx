import { render, screen } from "@testing-library/react";
import LandingPage from "../View";

// Mocks para los subcomponentes
jest.mock("../components/Navbar", () => () => <div>Mocked Navbar</div>);
jest.mock("../components/Hero", () => () => <div>Mocked Hero</div>);

describe("LandingPage", () => {
  it("should render Navbar and Hero components", () => {
    render(<LandingPage />);

    expect(screen.getByText("Mocked Navbar")).toBeInTheDocument();

    expect(screen.getByText("Mocked Hero")).toBeInTheDocument();
  });

  it("should have the correct background gradient", () => {
    const { container } = render(<LandingPage />);

    expect(container.firstChild).toHaveClass(
      "w-full h-screen bg-gradient-to-tr from-[#0F1117] from-40% to-[#130C36] px-5"
    );
  });
});
