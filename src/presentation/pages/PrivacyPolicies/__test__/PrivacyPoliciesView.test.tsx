import React from "react";
import { render, screen } from "@testing-library/react";
import PrivacyPolicies from "../View";

jest.mock("@/presentation/components", () => ({
  AuthHeader: () => <div data-testid="auth-header">Auth Header</div>,
}));

describe("Componente PrivacyPolicies", () => {
  test("Debe renderizar el componente AuthHeader", () => {
    render(<PrivacyPolicies />);
    const authHeader = screen.getByTestId("auth-header");
    expect(authHeader).toBeInTheDocument();
  });

  test("Debe mostrar el título principal correctamente", () => {
    render(<PrivacyPolicies />);
    const mainTitle = screen.getByText(
      /Política de Tratamiento de Datos de FitHub Connect/i
    );
    expect(mainTitle).toBeInTheDocument();
  });

  test("Debe renderizar todas las secciones con sus títulos correspondientes", () => {
    render(<PrivacyPolicies />);
    const sectionTitles = [
      "1. Introducción",
      "2. Alcance",
      "3. Datos Recopilados",
      "4. Finalidad del Tratamiento",
      "5. Base Jurídica",
      "6. Derechos de los Usuarios",
      "7. Compartición y Transferencia de Datos",
      "8. Seguridad de los Datos",
      "9. Conservación de Datos",
      "10. Uso de Cookies y Tecnologías Similares",
      "11. Modificaciones a la Política de Tratamiento de Datos",
      "12. Contacto",
    ];

    sectionTitles.forEach((title) => {
      const section = screen.getByText(new RegExp(title, "i"));
      expect(section).toBeInTheDocument();
    });
  });

  test("Debe contener la dirección de correo electrónico de contacto", () => {
    render(<PrivacyPolicies />);
    const email = screen.getByText("fithubconnectplus@gmail.com");
    expect(email).toBeInTheDocument();
  });

  test("Debe tener el párrafo de fecha de entrada en vigencia", () => {
    render(<PrivacyPolicies />);
    const dateParagraph = screen.getByText(
      /Fecha de Entrada en Vigencia: 11 de marzo de 2024/i
    );
    expect(dateParagraph).toBeInTheDocument();
  });
});
