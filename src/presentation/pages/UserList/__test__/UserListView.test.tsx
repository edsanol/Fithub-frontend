import { render, screen } from "@testing-library/react";
import ViewModel from "../ViewModel";
import UserList from "../View";

jest.mock("../ViewModel");
jest.mock("@/presentation/components", () => ({
  CustomModal: ({ isOpen, onOpenChange, content, footerContent }: any) =>
    isOpen ? (
      <div>
        <div>{content}</div>
        <div>{footerContent}</div>
      </div>
    ) : null,
  CustomTable: ({ records, columns }: any) => (
    <table>
      <tbody>
        {records.map((record: any, index: number) => (
          <tr key={index}>
            {columns.map((column: any) => (
              <td key={column.key}>{record[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  DashboardHeader: ({ title }: any) => <h1>{title}</h1>,
  FormInput: ({ label }: any) => <input aria-label={label} />,
  FormSelect: ({ label }: any) => <select aria-label={label} />,
  FormRadioButton: ({ label }: any) => <div>{label}</div>,
  PrimaryButton: ({ text }: any) => <button>{text}</button>,
  InfoModal: ({ isOpen, message }: any) =>
    isOpen ? <div>{message}</div> : null,
}));

describe("UserList Component", () => {
  const mockToggleModal = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockDeleteAthleteUser = jest.fn();
  const mockHandleSetNumPage = jest.fn();
  const mockHandleSetTextFilter = jest.fn();
  const mockSetField = jest.fn();
  const mockHandleOpenModal = jest.fn();

  beforeEach(() => {
    // Configurar el mock del ViewModel para proporcionar los datos esperados
    (ViewModel as jest.Mock).mockReturnValue({
      athletesList: [
        { athleteId: 1, athleteName: "John", athleteLastName: "Doe" },
      ],
      athleteUser: {
        athleteId: 1,
        athleteName: "John",
        athleteLastName: "Doe",
        birthDate: "1990-01-01T00:00:00Z", // Proveer un valor válido para birthDate
        phoneNumber: "123456789",
        email: "john@example.com",
        membershipName: "Premium",
        genre: "Male",
      },
      membership: [],
      AthleteColumns: [
        { key: "athleteName", label: "Name" },
        { key: "athleteLastName", label: "Last Name" },
      ],
      isModalOpen: {
        detailsModal: false,
        editMembershipModal: false,
        deleteModal: false,
      },
      errorModal: false,
      errorMessage: "",
      setErrorModal: jest.fn(),
      deleteAthleteUser: mockDeleteAthleteUser,
      handleOpenModal: mockHandleOpenModal,
      handleRedirect: jest.fn(),
      setField: mockSetField,
      handleSetNumPage: mockHandleSetNumPage,
      handleSetTextFilter: mockHandleSetTextFilter,
      toggleModal: mockToggleModal,
      updateMembership: mockHandleSubmit,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the DashboardHeader and CustomTable", () => {
    render(<UserList />);

    expect(screen.getByText("Gestiona tu Gimnasio")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });
});
