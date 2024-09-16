import { fireEvent, render, screen } from "@testing-library/react";
import ViewModel from "../ViewModel";
import Membership from "../View";

jest.mock("@/presentation/components", () => ({
  FormInput: jest.fn(({ onChange, value, errorMessage }) => (
    <div data-testid="form-input">
      <input value={value} onChange={(e) => onChange(e.target.value)} />
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  )),
  CustomModal: jest.fn(({ isOpen, content }) =>
    isOpen ? <div data-testid="custom-modal">{content}</div> : null
  ),
  CustomTable: jest.fn(({ records, customRenderCell }) => (
    <table>
      {records.map((record: any, index: number) => (
        <tbody key={index}>
          <tr>
            <td>{customRenderCell(record, "testColumn")}</td>
          </tr>
        </tbody>
      ))}
    </table>
  )),
  PrimaryButton: jest.fn(({ text, onClick }) => (
    <button data-testid="primary-button" onClick={onClick}>
      {text}
    </button>
  )),
  FormTextarea: jest.fn(({ onChange, value }) => (
    <textarea
      data-testid="form-textarea"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )),
  DashboardHeader: jest.fn(() => (
    <div data-testid="dashboard-header">Dashboard Header</div>
  )),
  FormSwitch: jest.fn(({ onChange, defaultSelected }) => (
    <input
      data-testid="form-switch"
      type="checkbox"
      checked={defaultSelected}
      onChange={(e) => onChange(e.target.checked)}
    />
  )),
  InfoModal: jest.fn(({ isOpen, message }) =>
    isOpen ? <div data-testid="info-modal">{message}</div> : null
  ),
}));

// Mock de ViewModel
jest.mock("../ViewModel", () => jest.fn());

describe("Membership Component", () => {
  const mockViewModel = {
    handleSubmit: jest.fn((e) => e.preventDefault()),
    deleteMembership: jest.fn(),
    handleOpenModal: jest.fn(),
    toggleModal: jest.fn(),
    setField: jest.fn(),
    setError: jest.fn(),
    membership: {
      membershipName: "Basic Membership",
      cost: 50,
      durationInDays: 30,
      description: "Description",
      membershipID: 1,
      status: true,
    },
    MembershipColumns: [],
    membershipList: [{ membershipName: "Basic Membership", membershipID: 1 }],
    membershipError: {
      membershipNameError: false,
      costError: false,
      durationInDaysError: false,
      descriptionError: false,
    },
    isModalOpen: {
      createModal: true,
      editModal: false,
      detailsModal: false,
      deleteModal: false,
      infoModal: false,
    },
    modalMode: "create",
    error: false,
    errorMessage: "Error message",
  };

  beforeEach(() => {
    (ViewModel as jest.Mock).mockReturnValue(mockViewModel);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the dashboard header", () => {
    render(<Membership />);

    expect(screen.getByTestId("dashboard-header")).toBeInTheDocument();
  });

  it("should render the form inputs for membership details in create mode", () => {
    render(<Membership />);

    expect(screen.getByDisplayValue("Basic Membership")).toBeInTheDocument();
    expect(screen.getByTestId("form-textarea")).toBeInTheDocument();
    expect(screen.getByText("Editar")).toBeInTheDocument();
  });

  it("should call handleOpenModal when 'Crear membresía' button is clicked", () => {
    render(<Membership />);

    const createButton = screen.getByText("Crear membresía");
    fireEvent.click(createButton);

    expect(mockViewModel.handleOpenModal).toHaveBeenCalledWith("createModal");
  });

  it("should render the info modal when an error is present", () => {
    mockViewModel.error = true;
    render(<Membership />);

    const infoModal = screen.getByTestId("info-modal");
    expect(infoModal).toBeInTheDocument();
    expect(infoModal).toHaveTextContent("Error message");
  });

  it("should show error message when costError is true", () => {
    mockViewModel.membershipError.costError = true;
    render(<Membership />);

    expect(
      screen.getByText("Por favor ingresa un precio válido")
    ).toBeInTheDocument();
  });

  it("should show error message when durationInDaysError is true", () => {
    mockViewModel.membershipError.durationInDaysError = true;
    render(<Membership />);

    expect(
      screen.getByText("Por favor ingresa una duración válida")
    ).toBeInTheDocument();
  });
});
