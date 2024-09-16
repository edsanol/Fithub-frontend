import { fireEvent, render, screen } from "@testing-library/react";
import ViewModel from "../ViewModel";
import RecoveryPassword from "../View";

// Mocks
jest.mock("../ViewModel"); // Mock del ViewModel
jest.mock("@/presentation/components", () => ({
  AuthHeader: jest.fn(() => <div data-testid="AuthHeader" />),
  CustomModal: jest.fn(
    ({ isOpen }) => isOpen && <div data-testid="CustomModal" />
  ),
  FormInput: jest.fn(({ label, errorMessage, isInvalid, color }) => (
    <div data-testid="FormInput">
      <input aria-label={label} />
      {isInvalid && <span style={{ color }}>{errorMessage}</span>}
    </div>
  )),
  FormLink: jest.fn(() => (
    <a href="/" data-testid="FormLink">
      FormLink
    </a>
  )),
  InfoModal: jest.fn(({ isOpen }) => isOpen && <div data-testid="InfoModal" />),
  PrimaryButton: jest.fn((props) => <button {...props}>{props.text}</button>),
}));

describe("RecoveryPassword Component", () => {
  let mockViewModel: any;

  beforeEach(() => {
    mockViewModel = {
      emailError: false,
      isModalOpen: false,
      erroModal: false,
      errorMessage: "",
      setErrorModal: jest.fn(),
      handleEmail: jest.fn(),
      handleSubmit: jest.fn(),
      toggleModal: jest.fn(),
    };

    (ViewModel as jest.Mock).mockReturnValue(mockViewModel);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render all main components", () => {
    render(<RecoveryPassword />);

    expect(screen.getByTestId("AuthHeader")).toBeInTheDocument();
    expect(screen.getByTestId("FormInput")).toBeInTheDocument();
    expect(
      screen.getByText("Enviar correo de recuperación")
    ).toBeInTheDocument();
    expect(screen.getByTestId("FormLink")).toBeInTheDocument();
  });

  it("should show email error message", () => {
    mockViewModel.emailError = true;

    render(<RecoveryPassword />);

    expect(
      screen.getByText(
        "Por favor ingresa un email válido"
      )
    ).toBeInTheDocument();
  });
});
