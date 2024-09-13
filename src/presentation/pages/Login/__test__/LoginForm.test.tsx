import { render, screen } from "@testing-library/react";
import ViewModel from "../components/login-form/ViewModel";
import LoginForm from "../components/login-form/LoginForm";

jest.mock("../../../components", () => ({
  FormInput: jest.fn(({ label, errorMessage, isInvalid, color }) => (
    <div data-testid="form-input">
      <input aria-label={label} />
      {isInvalid && <span style={{ color }}>{errorMessage}</span>}
    </div>
  )),
  FormInputPassword: jest.fn(({ label, errorMessage, isInvalid, color }) => (
    <div data-testid="form-input-password">
      <input aria-label={label} />
      {isInvalid && <span style={{ color }}>{errorMessage}</span>}
    </div>
  )),
  FormLink: jest.fn(({ text }) => <a href="/recovery-password">{text}</a>),
  PrimaryButton: jest.fn(({ text }) => <button>{text}</button>),
}));

// Mock del ViewModel
jest.mock("../components/login-form/ViewModel", () => jest.fn());

describe("LoginForm Component", () => {
  const mockViewModel = {
    handleSubmit: jest.fn((e) => e.preventDefault()),
    handleSetEmail: jest.fn(),
    handleSetPassword: jest.fn(),
    emailError: false,
    passwordError: false,
  };

  beforeEach(() => {
    // Se asegura de que el ViewModel retorne el mock correcto
    (ViewModel as jest.Mock).mockReturnValue(mockViewModel);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form and its elements", () => {
    render(<LoginForm />);

    expect(screen.getByTestId("form-input")).toBeInTheDocument();

    expect(screen.getByTestId("form-input-password")).toBeInTheDocument();

    expect(
      screen.getByText("¿Has olvidado tu contraseña?")
    ).toBeInTheDocument();

    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  it("should show email error message", () => {
    mockViewModel.emailError = true;
    mockViewModel.passwordError = false;

    render(<LoginForm />);

    expect(
      screen.getByText(
        "Credenciales invalidas, email y/o contraseña incorrectos."
      )
    ).toBeInTheDocument();
  });

  it("should show password error message", () => {
    mockViewModel.passwordError = true;
    mockViewModel.emailError = false;

    render(<LoginForm />);

    expect(
      screen.getByText(
        "Credenciales invalidas, email y/o contraseña incorrectos."
      )
    ).toBeInTheDocument();
  });
});
