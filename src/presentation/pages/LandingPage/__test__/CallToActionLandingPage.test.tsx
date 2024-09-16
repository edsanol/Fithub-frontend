import { render, screen, fireEvent } from "@testing-library/react";
import CallToAction from "../components/CallToAction";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CallToAction Component", () => {
  let routerMock: { push: jest.Mock };

  beforeEach(() => {
    routerMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);
  });

  it("should render the title and description", () => {
    render(<CallToAction />);

    expect(
      screen.getByText("¿Listo para transformar la gestión de tu gimnasio?")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Regístrese para una prueba gratuita o programe una demostración para ver cómo FitHub puede optimizar las operaciones de su gimnasio."
      )
    ).toBeInTheDocument();
  });

  it("should navigate to the register page when 'Comenzar prueba gratuita' is clicked", () => {
    const { push } = routerMock;

    render(<CallToAction />);

    const startTrialButton = screen.getByRole("button", {
      name: /Comenzar prueba gratuita/i,
    });
    fireEvent.click(startTrialButton);

    expect(push).toHaveBeenCalledWith("/register");
  });

  it("should navigate to the register page when 'Agendar demo' is clicked", () => {
    const { push } = routerMock;

    render(<CallToAction />);

    const scheduleDemoButton = screen.getByRole("button", {
      name: /Agendar demo/i,
    });
    fireEvent.click(scheduleDemoButton);

    expect(push).toHaveBeenCalledWith("/register");
  });

  it("should have the correct background color", () => {
    const { container } = render(<CallToAction />);

    expect(container.firstChild).toHaveClass("bg-[#006fed]");
  });
});
