import { render, screen } from "@testing-library/react";
import HowItWorks from "../components/HowItWorks";

describe("HowItWorks Component", () => {
  it("should render the main title", () => {
    render(<HowItWorks />);

    expect(screen.getByText("Cómo funciona")).toBeInTheDocument();
  });

  it("should render the image with correct alt text", () => {
    render(<HowItWorks />);

    const image = screen.getByAltText("FitHub Dashboard");
    expect(image).toBeInTheDocument();
  });

  it("should render all steps with correct titles and descriptions", () => {
    render(<HowItWorks />);

    expect(screen.getByText("1. Dashboard centralizado")).toBeInTheDocument();
    expect(screen.getByText("2. Gestión de miembros")).toBeInTheDocument();
    expect(
      screen.getByText("3. Seguimiento del rendimiento")
    ).toBeInTheDocument();
    expect(screen.getByText("4. Resumen financiero")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Accede a todas las métricas y funciones clave de tu gimnasio desde un dashboard de control intuitivo."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Agregue, actualice y administre fácilmente perfiles de miembros y suscripciones."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Supervise el progreso del atleta y genere un rendimiento detallado informes."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Obtenga información en tiempo real sobre la salud financiera de su gimnasio y actuación."
      )
    ).toBeInTheDocument();
  });

  it("should render the list items correctly", () => {
    render(<HowItWorks />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(4);
  });
});
