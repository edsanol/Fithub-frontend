import { render, screen } from "@testing-library/react";
import ViewModel from "../ViewModel";
import ResetPassword from "../View";

jest.mock("../ViewModel");

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
  AuthHeader: jest.fn(() => <div data-testid="auth-header" />),
}));

describe("ResetPassword Component", () => {
  let handleSubmitMock: jest.Mock;
  let handleSetConfirmPasswordMock: jest.Mock;
  let handleSetNewPasswordMock: jest.Mock;

  beforeEach(() => {
    handleSubmitMock = jest.fn((e) => e.preventDefault());
    handleSetConfirmPasswordMock = jest.fn();
    handleSetNewPasswordMock = jest.fn();

    // Mock del ViewModel que se utiliza en el componente
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: handleSubmitMock,
      handleSetConfirmPassword: handleSetConfirmPasswordMock,
      handleSetNewPassword: handleSetNewPasswordMock,
      resetPasswordDataError: {
        newPasswordError: false,
        confirmPasswordError: false,
      },
    });
  });

  it("should render the component with the necessary elements", () => {
    render(<ResetPassword />);

    expect(screen.getByTestId("auth-header")).toBeInTheDocument();
  });

  it("Should show the error message when the newPasswordError is true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: handleSubmitMock,
      handleSetConfirmPassword: handleSetConfirmPasswordMock,
      handleSetNewPassword: handleSetNewPasswordMock,
      resetPasswordDataError: {
        newPasswordError: true,
        confirmPasswordError: false,
      },
    });

    render(<ResetPassword />);

    expect(
      screen.getByText("Por favor ingresa una contraseña válida")
    ).toBeInTheDocument();
  });

  it("Should show the error message when the newPasswordError is true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      handleSubmit: handleSubmitMock,
      handleSetConfirmPassword: handleSetConfirmPasswordMock,
      handleSetNewPassword: handleSetNewPasswordMock,
      resetPasswordDataError: {
        newPasswordError: false,
        confirmPasswordError: true,
      },
    });

    render(<ResetPassword />);

    expect(
      screen.getByText("Las contraseñas no coinciden")
    ).toBeInTheDocument();
  });
});
