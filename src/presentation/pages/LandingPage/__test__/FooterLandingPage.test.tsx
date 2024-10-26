import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Footer Component", () => {
  let routerMock: { push: jest.Mock };

  beforeEach(() => {
    routerMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);
  });

  it("should render the copyright text", () => {
    render(<Footer />);

    expect(
      screen.getByText("© 2024 FitHub. Todos los derechos reservados.")
    ).toBeInTheDocument();
  });

  it("should render the link for 'Politica de tratamiento de datos'", () => {
    render(<Footer />);

    const termsLink = screen.getByText("Politica de tratamiento de datos");
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute("href", "/privacy-policies");
  });

  it("should have hover effect on the links", () => {
    render(<Footer />);

    const termsLink = screen.getByText("Politica de tratamiento de datos");

    expect(termsLink).toHaveClass("hover:text-[#006fed]");
  });
});
