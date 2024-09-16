import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { menuItems } from "@/assets/constants";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/assets/constants", () => ({
  menuItems: [
    { label: "Features", href: "#features" },
    { label: "Servicios", href: "#services" },
    { label: "Contacto", href: "#contact" },
  ],
}));

describe("Navbar Component", () => {
  let routerMock: { push: jest.Mock };

  beforeEach(() => {
    routerMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);
  });

  it("should render the logo and hamburger icon initially", () => {
    render(<Navbar />);

    expect(screen.getByText("FitHub")).toBeInTheDocument();
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("should toggle the navbar when the hamburger icon is clicked", () => {
    render(<Navbar />);

    const menu = screen.getByTestId("navbar");
    expect(menu).toHaveClass("hidden");

    const hamburgerIcon = screen.getByAltText("logo");
    fireEvent.click(hamburgerIcon);

    expect(menu).not.toHaveClass("hidden");

    fireEvent.click(hamburgerIcon);
    expect(menu).toHaveClass("hidden");
  });

  it("should render the correct menu items", () => {
    render(<Navbar />);

    menuItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("should navigate to login and register pages when buttons are clicked", () => {
    const { push } = routerMock;

    render(<Navbar />);

    const loginButton = screen.getByRole("button", { name: /Iniciar sesión/i });
    fireEvent.click(loginButton);
    expect(push).toHaveBeenCalledWith("/login");

    const registerButton = screen.getByRole("button", { name: /Registrarse/i });
    fireEvent.click(registerButton);
    expect(push).toHaveBeenCalledWith("/register");
  });

  it("should close the navbar when a menu item is clicked in mobile view", () => {
    render(<Navbar />);

    const hamburgerIcon = screen.getByAltText("logo");
    fireEvent.click(hamburgerIcon);

    const menuItem = screen.getByText("Features");
    fireEvent.click(menuItem);

    const menu = screen.getByTestId("navbar");
    expect(menu).toHaveClass("hidden");
  });
});
