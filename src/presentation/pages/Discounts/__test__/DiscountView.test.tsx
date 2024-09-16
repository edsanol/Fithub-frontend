import { fireEvent, render, screen } from "@testing-library/react";
import Discounts from "../View";
import { SessionProvider } from "next-auth/react";

jest.mock("@/presentation/components", () => ({
  CustomModal: ({ isOpen, content, footerContent }: any) =>
    isOpen ? (
      <div data-testid="custom-modal">
        {content}
        {footerContent}
      </div>
    ) : null,
  CustomTable: ({
    records = { items: [], totalRecords: 0 },
    columns = [],
  }: any) => (
    <table>
      {records.items.map((record: any, idx: number) => (
        <tr key={idx}>
          {columns.map((column: any) => (
            <td key={column.key}>{record[column.key]}</td>
          ))}
        </tr>
      ))}
    </table>
  ),
  DashboardHeader: ({ title, description }: any) => (
    <header>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  ),
  PrimaryButton: ({ text, onClick }: any) => (
    <button onClick={onClick}>{text}</button>
  ),
  FormInput: ({
    label,
    value = "",
    onChange,
    isInvalid,
    errorMessage,
  }: any) => (
    <div>
      <label>{label}</label>
      <input
        value={value || ""} // Usar cadena vacía si value es null o undefined
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={isInvalid}
        aria-describedby={errorMessage ? "error-message" : undefined}
      />
      {isInvalid && <span id="error-message">{errorMessage}</span>}
    </div>
  ),
  FormSelect: ({ label, value, onChange }: any) => (
    <div>
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select</option>
        <option value="1">Membership 1</option>
      </select>
    </div>
  ),
  FormTextarea: ({ label, value, onChange, isInvalid, errorMessage }: any) => (
    <div>
      <label>{label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {isInvalid && <span>{errorMessage}</span>}
    </div>
  ),
}));

jest.mock("@/assets/svg/WarningIcon", () => () => (
  <span data-testid="warning-icon"></span>
));

describe("Discounts Component", () => {
  const mockSession = {
    expires: "2024-09-30T12:00:00Z",
    user: { name: "Test User", email: "test@example.com" },
  };

  const renderWithSession = (component: JSX.Element) => {
    return render(
      <SessionProvider session={mockSession}>{component}</SessionProvider>
    );
  };

  it("renders header and create button", () => {
    renderWithSession(<Discounts />);

    expect(screen.getByText("Personaliza tus Descuentos")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Aquí podrás ver y actualizar todos tus detalles relacionados con los descuentos de tus membresías."
      )
    ).toBeInTheDocument();

    const createButton = screen.getByText("Crear descuento");
    expect(createButton).toBeInTheDocument();
  });

  it("opens the create discount modal when create button is clicked", () => {
    renderWithSession(<Discounts />);

    const createButton = screen.getByText("Crear descuento");
    fireEvent.click(createButton);

    expect(screen.getByTestId("custom-modal")).toBeInTheDocument();
    expect(screen.getByText("Porcentaje de descuento")).toBeInTheDocument();
  });
});
