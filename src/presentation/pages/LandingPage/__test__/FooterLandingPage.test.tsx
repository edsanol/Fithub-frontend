import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer Component", () => {
  it("should render the copyright text", () => {
    render(<Footer />);

    expect(
      screen.getByText("© 2024 FitHub. Todos los derechos reservados.")
    ).toBeInTheDocument();
  });

  it("should render the links for 'Términos y condiciones' and 'Privacidad'", () => {
    render(<Footer />);

    const termsLink = screen.getByText("Terminos y condiciones");
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute("href", "#");

    const privacyLink = screen.getByText("Privacidad");
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "#");
  });

  it("should have hover effect on the links", () => {
    render(<Footer />);

    const termsLink = screen.getByText("Terminos y condiciones");
    const privacyLink = screen.getByText("Privacidad");

    expect(termsLink).toHaveClass("hover:text-[#006fed]");
    expect(privacyLink).toHaveClass("hover:text-[#006fed]");
  });
});
