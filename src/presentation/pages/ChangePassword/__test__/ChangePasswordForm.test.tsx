import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChangePasswordForm from "../components/change-password-form/ChangePasswordForm";

jest.mock("../components/change-password-form/ViewModel", () => ({
  __esModule: true,
  default: () => ({
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
  }),
}));

jest.mock("@/presentation/components", () => ({
  FormInput: ({ label }: { label: string }) => <input aria-label={label} />,
  FormInputPassword: ({ label }: { label: string }) => (
    <input aria-label={label} type="password" />
  ),
  PrimaryButton: ({ text }: { text: string }) => <button>{text}</button>,
  InfoModal: ({ message }: { message: string }) => <div>{message}</div>,
}));

describe("ChangePasswordForm Component", () => {
  it("should render all form fields and the submit button", () => {
    render(<ChangePasswordForm />);

    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña actual")).toBeInTheDocument();
    expect(screen.getByLabelText("Nueva contraseña")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar contraseña")).toBeInTheDocument();
    expect(screen.getByText("Cambiar contraseña")).toBeInTheDocument();
  });
});
