import { render, screen } from "@testing-library/react";
import Features from "../components/Features";

describe("Features Component", () => {
  it("should render the main title", () => {
    render(<Features />);

    expect(screen.getByText("Características principales")).toBeInTheDocument();
  });

  it("should render all feature titles", () => {
    render(<Features />);

    expect(screen.getByText("Seguimiento de membresías")).toBeInTheDocument();
    expect(screen.getByText("Monitoreo del entrenamiento")).toBeInTheDocument();
    expect(screen.getByText("Informes financieros")).toBeInTheDocument();
    expect(screen.getByText("Programación de personal")).toBeInTheDocument();
  });

  it("should render all feature descriptions", () => {
    render(<Features />);

    expect(
      screen.getByText(
        "Administre y rastree fácilmente la información de los miembros, las suscripciones y renovaciones."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Realice un seguimiento del progreso de los atletas, establezca objetivos y cree entrenamientos personalizados planes."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Genere informes financieros completos y conocimientos para su gimnasia."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Administre eficientemente los horarios, turnos y asignaciones del personal."
      )
    ).toBeInTheDocument();
  });

  it("should render all feature icons", () => {
    render(<Features />);

    expect(screen.getByTestId("users-icon")).toBeInTheDocument();
    expect(screen.getByTestId("dumbbell-icon")).toBeInTheDocument();
    expect(screen.getByTestId("linechart-icon")).toBeInTheDocument();
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
  });
});
