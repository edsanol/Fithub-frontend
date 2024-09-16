import { fireEvent, render, screen } from "@testing-library/react";
import ViewModel from "../components/register-form/ViewModel";
import RegisterForm from "../components/register-form/RegisterForm";

// Mock de los subcomponentes
jest.mock("@/presentation/components", () => ({
  FormInput: jest.fn(({ label, errorMessage, isInvalid, color }) => (
    <div data-testid="form-input">
      <input aria-label={label} placeholder={label} />
      {isInvalid && <span style={{ color }}>{errorMessage}</span>}
    </div>
  )),
  FormInputPassword: jest.fn(({ label, errorMessage, isInvalid, color }) => (
    <div data-testid="form-input">
      <input aria-label={label} placeholder={label} />
      {isInvalid && <span style={{ color }}>{errorMessage}</span>}
    </div>
  )),
  FormLink: jest.fn(({ text }) => (
    <a href="/" data-testid="form-link">
      {text}
    </a>
  )),
  FormSelect: jest.fn(({ label }) => (
    <select data-testid={label}>
      <option value="">Test Option</option>
    </select>
  )),
  FormTextarea: jest.fn(({ label }) => (
    <textarea placeholder={label} data-testid={label} />
  )),
  InfoModal: jest.fn(({ message }) => <div>{message}</div>),
  PrimaryButton: jest.fn(({ text }) => <button>{text}</button>),
}));

jest.mock("../components/register-form/ViewModel", () => jest.fn());

describe("RegisterForm Component", () => {
  beforeEach(() => {
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: jest.fn(),
      setField: jest.fn(),
      setErrorModal: jest.fn(),
      gymDataError: {},
      errorModal: false,
      errorMessage: "",
    });
  });

  it("should render all form input fields", () => {
    render(<RegisterForm />);

    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Dirección")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("NIT o razón social")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Número de teléfono")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Correo electrónico")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Comentarios adicionales")
    ).toBeInTheDocument();
  });

  it("should call handleSubmit when the form is submitted", () => {
    const mockHandleSubmit = jest.fn();
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit,
      setField: jest.fn(),
      gymDataError: {},
    });

    render(<RegisterForm />);

    // Simular el envío del formulario
    fireEvent.submit(screen.getByRole("button", { name: /Registrarme/i }));

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("should display an error message in the modal when there's an error", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: jest.fn(),
      setField: jest.fn(),
      gymDataError: {},
      errorModal: true,
      errorMessage: "Test Error",
      setErrorModal: jest.fn(),
    });

    render(<RegisterForm />);

    // Verificar que se muestra el modal con el mensaje de error
    expect(screen.getByText("Test Error")).toBeInTheDocument();
  });

  it("Should show the error message when the gymNameError is true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: jest.fn(),
      setField: jest.fn(),
      gymDataError: { gymNameError: true },
    });

    render(<RegisterForm />);

    expect(
      screen.getByText("Por favor ingresa un nombre válido")
    ).toBeInTheDocument();
  });

  it("Should show the error message when the addressError is true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: jest.fn(),
      setField: jest.fn(),
      gymDataError: { addressError: true },
    });

    render(<RegisterForm />);

    expect(
      screen.getByText("Por favor ingresa una dirección válida")
    ).toBeInTheDocument();
  });

  it("Should show the error message when the phoneNumberError is true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: jest.fn(),
      setField: jest.fn(),
      gymDataError: { phoneNumberError: true },
    });

    render(<RegisterForm />);

    expect(
      screen.getByText("Por favor ingresa un número de teléfono válido")
    ).toBeInTheDocument();
  });

  it("Should show the error message when the emailError is true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: jest.fn(),
      setField: jest.fn(),
      gymDataError: { emailError: true },
    });

    render(<RegisterForm />);

    expect(
      screen.getByText("Por favor ingresa un correo electrónico válido")
    ).toBeInTheDocument();
  });

  it("Should show the error message when the passwordError is true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: jest.fn(),
      setField: jest.fn(),
      gymDataError: { passwordError: true },
    });

    render(<RegisterForm />);

    expect(
      screen.getByText("Por favor ingresa una contraseña válida")
    ).toBeInTheDocument();
  });

  it("Should show the error message when the nitError is true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: jest.fn(),
      setField: jest.fn(),
      gymDataError: { nitError: true },
    });

    render(<RegisterForm />);

    expect(
      screen.getByText("Por favor ingresa un NIT válido")
    ).toBeInTheDocument();
  });
});
