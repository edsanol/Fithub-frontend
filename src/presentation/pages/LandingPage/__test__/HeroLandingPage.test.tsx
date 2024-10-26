import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "../components/Hero";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Hero Component", () => {
  let routerMock: { push: jest.Mock };

  beforeEach(() => {
    routerMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);
  });

  it("should render the main heading and paragraph", () => {
    render(<Hero />);

    expect(
      screen.getByText("Optimice la gestión de su gimnasio con FitHub")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Administre sin esfuerzo las membresías, realice un seguimiento del progreso, maneje las finanzas y optimice la programación del personal. Todo en una poderosa plataforma."
      )
    ).toBeInTheDocument();
  });

  it("should render the image with the correct alt text", () => {
    render(<Hero />);

    expect(screen.getByAltText("FitHub Dashboard")).toBeInTheDocument();
  });

  it("should navigate to the register page when the 'Regístrate' button is clicked", () => {
    const { push } = routerMock;

    render(<Hero />);

    const registerButton = screen.getByRole("button", { name: /Regístrate/i });

    fireEvent.click(registerButton);

    expect(push).toHaveBeenCalledWith("/register");
  });

  // it("should log 'ver demo' when the 'Ver demo' button is clicked", () => {
  //   const consoleSpy = jest.spyOn(console, "log");

  //   render(<Hero />);

  //   const demoButton = screen.getByRole("button", { name: /Ver demo/i });

  //   fireEvent.click(demoButton);

  //   expect(consoleSpy).toHaveBeenCalledWith("ver demo");

  //   consoleSpy.mockRestore();
  // });
});
