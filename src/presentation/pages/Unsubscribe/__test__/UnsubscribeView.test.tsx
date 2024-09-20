// Unsubscribe.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Unsubscribe from "../View";
import ViewModel from "../ViewModel";

jest.mock("@/presentation/components", () => ({
  FormInput: jest.fn(({ label, errorMessage, isInvalid, color, onChange }) => (
    <div data-testid="form-input">
      <input
        aria-label={label}
        placeholder={label}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      {isInvalid && <span style={{ color }}>{errorMessage}</span>}
    </div>
  )),
  PrimaryButton: jest.fn(({ text, onClick }) => (
    <button data-testid="primary-button" type="button" onClick={onClick}>
      {text}
    </button>
  )),
  AuthHeader: jest.fn(() => <div data-testid="auth-header" />),
  CustomModal: jest.fn(({ isOpen, content, footerContent }) =>
    isOpen ? (
      <div data-testid="custom-modal">
        <div>{content}</div>
        <div>{footerContent}</div>
      </div>
    ) : null
  ),
  InfoModal: jest.fn(({ isOpen, message }) =>
    isOpen ? (
      <div data-testid="info-modal">
        <p>{message}</p>
      </div>
    ) : null
  ),
}));

jest.mock("@nextui-org/react", () => ({
  Button: jest.fn(({ children, onPress, onClick, ...props }) => (
    <button
      data-testid={`nextui-button-${children}`}
      onClick={onClick || onPress}
      {...props}
    >
      {children}
    </button>
  )),
}));

jest.mock("../ViewModel");

describe("Unsubscribe Component", () => {
  let handleEmailMock: jest.Mock;
  let handleSubmitMock: jest.Mock;
  let toggleModalMock: jest.Mock;
  let setErrorModalMock: jest.Mock;

  beforeEach(() => {
    handleEmailMock = jest.fn();
    handleSubmitMock = jest.fn();
    toggleModalMock = jest.fn();
    setErrorModalMock = jest.fn();

    (ViewModel as jest.Mock).mockReturnValue({
      emailError: false,
      isModalOpen: false,
      erroModal: false,
      errorMessage: "",
      setErrorModal: setErrorModalMock,
      handleEmail: handleEmailMock,
      handleSubmit: handleSubmitMock,
      toggleModal: toggleModalMock,
    });
  });

  it("Debe renderizar el componente con los elementos necesarios", () => {
    render(<Unsubscribe />);

    expect(screen.getByTestId("auth-header")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Eliminar cuenta", level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Nos entristece que te vayas. ¡Siempre serás bienvenido de vuelta!"
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Eliminar cuenta" })
    ).toBeInTheDocument();
  });

  it("Debe mostrar el mensaje de error cuando emailError es true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      ...ViewModel(),
      emailError: true,
      handleEmail: handleEmailMock,
    });

    render(<Unsubscribe />);

    expect(
      screen.getByText("Por favor ingresa un email válido")
    ).toBeInTheDocument();
  });

  it("Debe llamar a handleEmail al cambiar el correo electrónico", async () => {
    render(<Unsubscribe />);

    const emailInput = screen.getByLabelText("Correo electrónico");
    await userEvent.type(emailInput, "test@example.com");

    expect(handleEmailMock).toHaveBeenCalledTimes("test@example.com".length);

    expect(handleEmailMock).toHaveBeenLastCalledWith("test@example.com");
  });

  it("Debe llamar a toggleModal al hacer clic en 'Eliminar cuenta'", async () => {
    render(<Unsubscribe />);

    const deleteButton = screen.getByRole("button", {
      name: "Eliminar cuenta",
    });
    await userEvent.click(deleteButton);

    expect(toggleModalMock).toHaveBeenCalled();
  });

  it("Debe mostrar el CustomModal cuando isModalOpen es true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      ...ViewModel(),
      isModalOpen: true,
      toggleModal: toggleModalMock,
    });

    render(<Unsubscribe />);

    expect(screen.getByTestId("custom-modal")).toBeInTheDocument();
  });

  it("Debe llamar a handleSubmit al confirmar la eliminación", async () => {
    (ViewModel as jest.Mock).mockReturnValue({
      emailError: false,
      isModalOpen: true,
      erroModal: false,
      errorMessage: "",
      setErrorModal: setErrorModalMock,
      handleEmail: handleEmailMock,
      handleSubmit: handleSubmitMock,
      toggleModal: toggleModalMock,
    });

    render(<Unsubscribe />);

    const confirmButton = screen.getByTestId("nextui-button-Si, eliminar");
    await userEvent.click(confirmButton);

    expect(handleSubmitMock).toHaveBeenCalled();
  });

  it("Debe mostrar el InfoModal cuando erroModal es true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      ...ViewModel(),
      erroModal: true,
      errorMessage: "Error al eliminar la cuenta",
      setErrorModal: setErrorModalMock,
    });

    render(<Unsubscribe />);

    expect(screen.getByTestId("info-modal")).toBeInTheDocument();
    expect(screen.getByText("Error al eliminar la cuenta")).toBeInTheDocument();
  });
});
