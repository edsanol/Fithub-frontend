import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonLogin } from "../components";
import { signIn } from "next-auth/react";

// Mock de signIn de next-auth
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("ButtonLogin Component", () => {
  it("should render the login button with the correct text", () => {
    render(<ButtonLogin />);

    // Verifica que el botón se renderiza con el texto "Inicia sesión"
    const buttonElement = screen.getByRole("button", {
      name: /Inicia sesión/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call signIn when the button is clicked", () => {
    render(<ButtonLogin />);

    // Obtén el botón
    const buttonElement = screen.getByRole("button", {
      name: /Inicia sesión/i,
    });

    // Simula un clic en el botón
    fireEvent.click(buttonElement);

    // Verifica que signIn haya sido llamado
    expect(signIn).toHaveBeenCalled();
  });
});
