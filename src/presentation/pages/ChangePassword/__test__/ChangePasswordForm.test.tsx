import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChangePasswordForm from "../components/change-password-form/ChangePasswordForm";
import ViewModel from "../components/change-password-form/ViewModel";

jest.mock("../components/change-password-form/ViewModel", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/presentation/components", () => ({
  FormInput: ({
    label,
    errorMessage,
    isInvalid,
    color,
  }: {
    label: string;
    errorMessage?: string;
    isInvalid?: boolean;
    color?: string;
  }) => (
    <div>
      <input aria-label={label} />
      {isInvalid && <span style={{ color }}>{errorMessage}</span>}
    </div>
  ),
  FormInputPassword: ({
    label,
    errorMessage,
    isInvalid,
    color,
  }: {
    label: string;
    errorMessage?: string;
    isInvalid?: boolean;
    color?: string;
  }) => (
    <div>
      <input aria-label={label} type="password" />
      {isInvalid && <span style={{ color }}>{errorMessage}</span>}
    </div>
  ),
  PrimaryButton: ({ text }: { text: string }) => <button>{text}</button>,
  InfoModal: ({ message }: { message: string }) => <div>{message}</div>,
}));

describe("ChangePasswordForm Component", () => {
  beforeEach(() => {
    (ViewModel as jest.Mock).mockReturnValue({
      changePasswordDataError: {
        emailError: false,
        passwordError: false,
        newPasswordError: false,
        confirmPasswordError: false,
      },
      modalMessage: "",
      modalVisible: false,
      handleSubmit: jest.fn((e) => e.preventDefault()),
      setField: jest.fn(),
      setModalVisible: jest.fn(),
    });
  });

  it("should render all form fields and the submit button", () => {
    render(<ChangePasswordForm />);

    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña actual")).toBeInTheDocument();
    expect(screen.getByLabelText("Nueva contraseña")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar contraseña")).toBeInTheDocument();
    expect(screen.getByText("Cambiar contraseña")).toBeInTheDocument();
  });

  it("should display the InfoModal when modalVisible is true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      changePasswordDataError: {
        emailError: false,
        passwordError: false,
        newPasswordError: false,
        confirmPasswordError: false,
      },
      modalMessage: "Test Message",
      modalVisible: true,
      handleSubmit: jest.fn((e) => e.preventDefault()),
      setField: jest.fn(),
      setModalVisible: jest.fn(),
    });

    render(<ChangePasswordForm />);

    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("should call handleSubmit on form submission", () => {
    const handleSubmitMock = jest.fn((e) => e.preventDefault());

    (ViewModel as jest.Mock).mockReturnValue({
      changePasswordDataError: {
        emailError: false,
        passwordError: false,
        newPasswordError: false,
        confirmPasswordError: false,
      },
      modalMessage: "Test Message",
      modalVisible: true,
      handleSubmit: handleSubmitMock,
      setField: jest.fn(),
      setModalVisible: jest.fn(),
    });

    render(<ChangePasswordForm />);

    fireEvent.submit(screen.getByTestId("change-password-id"));

    expect(handleSubmitMock).toHaveBeenCalled();
  });

  it("should display error messages for invalid fields", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      changePasswordDataError: {
        emailError: true,
        passwordError: true,
        newPasswordError: true,
        confirmPasswordError: true,
      },
      modalMessage: "",
      modalVisible: false,
      handleSubmit: jest.fn((e) => e.preventDefault()),
      setField: jest.fn(),
      setModalVisible: jest.fn(),
    });

    render(<ChangePasswordForm />);

    expect(
      screen.queryByText("Por favor ingresa un nombre válido")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Por favor ingresa una contraseña válida")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("No puedes usar la misma contraseña")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Las contraseñas no coinciden")
    ).toBeInTheDocument();
  });
});
