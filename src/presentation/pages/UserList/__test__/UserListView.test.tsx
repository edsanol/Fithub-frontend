import { fireEvent, render, screen } from "@testing-library/react";
import ViewModel from "../ViewModel";
import UserList from "../View";
import { CustomTable } from "@/presentation/components";

jest.mock("@/assets/svg/WarningIcon", () => () => <div>WarningIcon</div>);
jest.mock("@/presentation/components", () => ({
  CustomModal: jest.fn(({ isOpen, content, footerContent }) =>
    isOpen ? (
      <div data-testid="CustomModal">
        {content}
        {footerContent}
      </div>
    ) : null
  ),
  CustomTable: jest.fn(({ customRenderCell }) => (
    <div data-testid="CustomTable">
      {customRenderCell && customRenderCell({}, "")}
    </div>
  )),
  DashboardHeader: jest.fn(({ title, description }) => (
    <div data-testid="DashboardHeader">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )),
  FormInput: jest.fn(({ label, value }) => (
    <div data-testid="FormInput">
      {label}: {value}
    </div>
  )),
  FormRadioButton: jest.fn(({ label, value }) => (
    <div data-testid="FormRadioButton">
      {label}: {value}
    </div>
  )),
  FormSelect: jest.fn(({ label }) => (
    <div data-testid="FormSelect">{label}</div>
  )),
  InfoModal: jest.fn(({ isOpen, message }) =>
    isOpen ? <div data-testid="InfoModal">{message}</div> : null
  ),
  PrimaryButton: jest.fn(({ text }) => (
    <button data-testid="PrimaryButton">{text}</button>
  )),
}));

jest.mock("../ViewModel", () => jest.fn());

describe("UserList Component", () => {
  const mockViewModel = {
    athletesList: {
      totalRecords: 1,
      items: [
        {
          athleteId: 1,
          athleteName: "John",
          athleteLastName: "Doe",
          phoneNumber: "123456789",
          email: "john@example.com",
          birthDate: "1990-01-01T00:00:00",
          genre: "Masculino",
          membershipName: "Gold",
        },
      ],
    },
    athleteUser: {
      athleteId: 1,
      athleteName: "John",
      athleteLastName: "Doe",
      phoneNumber: "123456789",
      email: "john@example.com",
      birthDate: "1990-01-01T00:00:00",
      genre: "Masculino",
      membershipName: "Gold",
    },
    isModalOpen: {
      detailsModal: false,
      deleteModal: false,
      editMembershipModal: false,
    },
    membership: [],
    AthleteColumns: [
      { name: "Nombre", uid: "athleteName" },
      { name: "Apellido", uid: "athleteLastName" },
      // Agrega las columnas que necesites
    ],
    errorModal: false,
    errorMessage: "",
    setErrorModal: jest.fn(),
    deleteAthleteUser: jest.fn(),
    handleOpenModal: jest.fn(),
    handleRedirect: jest.fn(),
    setField: jest.fn(),
    handleSetNumPage: jest.fn(),
    handleSetTextFilter: jest.fn(),
    toggleModal: jest.fn(),
    updateMembership: jest.fn(),
  };

  beforeEach(() => {
    // Restablecer los mocks antes de cada prueba
    jest.clearAllMocks();
    // Mockear la implementación del ViewModel
    (ViewModel as jest.Mock).mockReturnValue(mockViewModel);
  });

  it("debería renderizar el componente correctamente", () => {
    render(<UserList />);
    expect(screen.getByTestId("DashboardHeader")).toBeInTheDocument();
    expect(screen.getByTestId("CustomTable")).toBeInTheDocument();
  });

  it("debería abrir el modal de detalles cuando detailsModal es true", () => {
    mockViewModel.isModalOpen.detailsModal = true;
    render(<UserList />);
    expect(screen.getByTestId("CustomModal")).toBeInTheDocument();
    expect(screen.getByText("Nombres: John")).toBeInTheDocument();
  });

  it("debería mostrar el InfoModal cuando errorModal es true", () => {
    mockViewModel.errorModal = true;
    mockViewModel.errorMessage = "Error al cargar datos";
    render(<UserList />);
    expect(screen.getByTestId("InfoModal")).toBeInTheDocument();
    expect(screen.getByText("Error al cargar datos")).toBeInTheDocument();
  });

  it("debería llamar a customRenderCell con los parámetros correctos", () => {
    const mockCustomRenderCell = jest.fn();
    const mockUser = { athleteId: 1 };
    const mockColumnKey = "athleteName";

    // Sobrescribimos el mock de CustomTable para capturar customRenderCell
    jest.mocked(CustomTable).mockImplementation(({ customRenderCell }) => {
      customRenderCell(mockUser, mockColumnKey);
      return <div data-testid="CustomTable"></div>;
    });

    render(<UserList />);

    expect(mockCustomRenderCell).not.toHaveBeenCalled(); // Aseguramos que no se llame el mock anterior

    expect(CustomTable).toHaveBeenCalledWith(
      expect.objectContaining({
        customRenderCell: expect.any(Function),
      }),
      {}
    );
  });

  it('debería mostrar "Sin membresía" cuando athleteUser.membershipName es undefined', () => {
    // Configuramos athleteUser.membershipName como undefined
    mockViewModel.athleteUser.membershipName = undefined;
    mockViewModel.isModalOpen.detailsModal = true;

    render(<UserList />);

    // Verificamos que el FormInput muestra "Sin membresía"
    expect(screen.getByText(/Membresía: Sin membresía/)).toBeInTheDocument();
  });

  it("debería mostrar el nombre de la membresía cuando athleteUser.membershipName tiene valor", () => {
    // Configuramos athleteUser.membershipName con un valor
    mockViewModel.athleteUser.membershipName = "Gold";
    mockViewModel.isModalOpen.detailsModal = true;

    render(<UserList />);

    // Verificamos que el FormInput muestra "Membresía: Gold"
    expect(screen.getByText(/Membresía: Gold/)).toBeInTheDocument();
  });

  it("debería llamar a deleteAthleteUser y toggleModal al confirmar eliminación", () => {
    mockViewModel.isModalOpen.deleteModal = true;
    mockViewModel.athleteUser = {
      athleteId: 1,
      athleteName: "John",
      birthDate: "1990-01-01T00:00:00",
    };

    render(<UserList />);

    // Simulamos el clic en el botón "Si, eliminar"
    const deleteButton = screen.getByText("Si, eliminar");
    fireEvent.click(deleteButton);

    // Verificamos que deleteAthleteUser se llamó con el athleteId correcto
    expect(mockViewModel.deleteAthleteUser).toHaveBeenCalledWith(1);

    // Verificamos que toggleModal se llamó con "deleteModal"
    expect(mockViewModel.toggleModal).toHaveBeenCalledWith("deleteModal");
  });
});
