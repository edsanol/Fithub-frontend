import { fireEvent, render, screen, within } from "@testing-library/react";
import ViewModel from "../ViewModel";
import UserProgress from "../View";

jest.mock("@/presentation/components", () => ({
  DashboardHeader: jest.fn(() => <div data-testid="DashboardHeader" />),
  FormSearchInput: jest.fn(({ onChange, onSelectSuggestion }) => (
    <div data-testid="FormSearchInput">
      <input onChange={(e) => onChange(e.target.value)} />
      <button
        onClick={() =>
          onSelectSuggestion({ athleteName: "John", athleteLastName: "Doe" })
        }
      >
        Select Suggestion
      </button>
    </div>
  )),
  PrimaryButton: jest.fn(({ onClick }) => (
    <button data-testid="PrimaryButton" onClick={onClick}>
      Registrar medidas
    </button>
  )),
  CustomProgressCard: jest.fn(({ onPress }) => (
    <div data-testid="CustomProgressCard" onClick={onPress} />
  )),
  CustomTable: jest.fn(() => <div data-testid="CustomTable" />),
  CustomModal: jest.fn(({ isOpen, content }) =>
    isOpen ? <div data-testid="CustomModal">{content}</div> : null
  ),
  InfoModal: jest.fn(({ isOpen, message }) =>
    isOpen ? <div data-testid="InfoModal">{message}</div> : null
  ),
  FormInput: jest.fn(({ isInvalid, errorMessage, label, onChange }) => (
    <div data-testid={`FormInput-${label}`}>
      <input
        data-testid={`input-${label}`}
        onChange={(e) => onChange(e.target.value)}
      />
      {isInvalid && (
        <span data-testid={`error-message-${label}`}>{errorMessage}</span>
      )}
    </div>
  )),
  CustomAreaGraph: jest.fn(() => <div data-testid="CustomAreaGraph" />),
}));

jest.mock("@/presentation/helpers", () => ({
  mapperMuscleIcon: jest.fn(() => () => <div data-testid="MuscleIcon" />),
}));

jest.mock("../ViewModel", () => jest.fn());

describe("UserProgress Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component correctly", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      search: "",
      suggestions: [],
      showSuggestions: false,
      userSelected: null,
      isModalOpen: {
        createModal: false,
        progressModal: false,
      },
      measurementProgressList: { totalRecords: 0, items: [] },
      MeasurementProgressColumns: [],
      measurementProgressByLastMonth: [],
      graphicValues: [],
      errorModal: false,
      errorMessage: "",
      measurementsProgressError: {},
      setErrorModal: jest.fn(),
      handleChange: jest.fn(),
      handleSelectSuggestion: jest.fn(),
      toggleModal: jest.fn(),
      handleOpenModal: jest.fn(),
      setField: jest.fn(),
      handleSubmit: jest.fn(),
      handleSetNumPage: jest.fn(),
    });

    render(<UserProgress />);

    expect(screen.getByTestId("DashboardHeader")).toBeInTheDocument();
    expect(screen.getByTestId("FormSearchInput")).toBeInTheDocument();
    expect(screen.queryByTestId("PrimaryButton")).not.toBeInTheDocument();
  });

  it("should display PrimaryButton when a user is selected", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      search: "John Doe",
      suggestions: [],
      showSuggestions: false,
      userSelected: { athleteName: "John", athleteLastName: "Doe" },
      isModalOpen: {
        createModal: false,
        progressModal: false,
      },
      measurementProgressList: { totalRecords: 0, items: [] },
      MeasurementProgressColumns: [],
      measurementProgressByLastMonth: [],
      graphicValues: [],
      errorModal: false,
      errorMessage: "",
      measurementsProgressError: {},
      setErrorModal: jest.fn(),
      handleChange: jest.fn(),
      handleSelectSuggestion: jest.fn(),
      toggleModal: jest.fn(),
      handleOpenModal: jest.fn(),
      setField: jest.fn(),
      handleSubmit: jest.fn(),
      handleSetNumPage: jest.fn(),
    });

    render(<UserProgress />);

    expect(screen.getByTestId("PrimaryButton")).toBeInTheDocument();
  });

  it("should call handleOpenModal when PrimaryButton is clicked", () => {
    const handleOpenModalMock = jest.fn();

    (ViewModel as jest.Mock).mockReturnValue({
      search: "John Doe",
      suggestions: [],
      showSuggestions: false,
      userSelected: { athleteName: "John", athleteLastName: "Doe" },
      isModalOpen: {
        createModal: false,
        progressModal: false,
      },
      measurementProgressList: { totalRecords: 0, items: [] },
      MeasurementProgressColumns: [],
      measurementProgressByLastMonth: [],
      graphicValues: [],
      errorModal: false,
      errorMessage: "",
      measurementsProgressError: {},
      setErrorModal: jest.fn(),
      handleChange: jest.fn(),
      handleSelectSuggestion: jest.fn(),
      toggleModal: jest.fn(),
      handleOpenModal: handleOpenModalMock,
      setField: jest.fn(),
      handleSubmit: jest.fn(),
      handleSetNumPage: jest.fn(),
    });

    render(<UserProgress />);

    fireEvent.click(screen.getByTestId("PrimaryButton"));

    expect(handleOpenModalMock).toHaveBeenCalledWith("createModal");
  });

  it("should display CustomProgressCard and CustomTable when data is available", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      search: "John Doe",
      suggestions: [],
      showSuggestions: false,
      userSelected: { athleteName: "John", athleteLastName: "Doe" },
      isModalOpen: {
        createModal: false,
        progressModal: false,
      },
      measurementProgressList: {
        totalRecords: 1,
        items: [{ measurementsProgressID: 1 }],
      },
      MeasurementProgressColumns: [{ name: "Test Column", uid: "testColumn" }],
      measurementProgressByLastMonth: [
        {
          muscle: "biceps",
          measurement: 30,
          progress: 2,
          progressPercentage: 7,
        },
      ],
      graphicValues: [],
      errorModal: false,
      errorMessage: "",
      measurementsProgressError: {},
      setErrorModal: jest.fn(),
      handleChange: jest.fn(),
      handleSelectSuggestion: jest.fn(),
      toggleModal: jest.fn(),
      handleOpenModal: jest.fn(),
      setField: jest.fn(),
      handleSubmit: jest.fn(),
      handleSetNumPage: jest.fn(),
    });

    render(<UserProgress />);

    expect(screen.getByTestId("CustomProgressCard")).toBeInTheDocument();
    expect(screen.getByTestId("CustomTable")).toBeInTheDocument();
  });

  it("should open progress modal when CustomProgressCard is clicked", () => {
    const handleOpenModalMock = jest.fn();

    (ViewModel as jest.Mock).mockReturnValue({
      search: "John Doe",
      suggestions: [],
      showSuggestions: false,
      userSelected: { athleteName: "John", athleteLastName: "Doe" },
      isModalOpen: {
        createModal: false,
        progressModal: false,
      },
      measurementProgressList: {
        totalRecords: 1,
        items: [{ measurementsProgressID: 1 }],
      },
      MeasurementProgressColumns: [{ name: "Test Column", uid: "testColumn" }],
      measurementProgressByLastMonth: [
        {
          muscle: "biceps",
          measurement: 30,
          progress: 2,
          progressPercentage: 7,
        },
      ],
      graphicValues: [],
      errorModal: false,
      errorMessage: "",
      measurementsProgressError: {},
      setErrorModal: jest.fn(),
      handleChange: jest.fn(),
      handleSelectSuggestion: jest.fn(),
      toggleModal: jest.fn(),
      handleOpenModal: handleOpenModalMock,
      setField: jest.fn(),
      handleSubmit: jest.fn(),
      handleSetNumPage: jest.fn(),
    });

    render(<UserProgress />);

    // Simulamos el clic en CustomProgressCard
    fireEvent.click(screen.getByTestId("CustomProgressCard"));

    expect(handleOpenModalMock).toHaveBeenCalledWith("progressModal", "biceps");
  });

  it("should display InfoModal when there is an error", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      search: "",
      suggestions: [],
      showSuggestions: false,
      userSelected: null,
      isModalOpen: {
        createModal: false,
        progressModal: false,
      },
      measurementProgressList: { totalRecords: 0, items: [] },
      MeasurementProgressColumns: [],
      measurementProgressByLastMonth: [],
      graphicValues: [],
      errorModal: true,
      errorMessage: "An error occurred",
      measurementsProgressError: {},
      setErrorModal: jest.fn(),
      handleChange: jest.fn(),
      handleSelectSuggestion: jest.fn(),
      toggleModal: jest.fn(),
      handleOpenModal: jest.fn(),
      setField: jest.fn(),
      handleSubmit: jest.fn(),
      handleSetNumPage: jest.fn(),
    });

    render(<UserProgress />);

    expect(screen.getByTestId("InfoModal")).toBeInTheDocument();
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });

  it("should display error messages on FormInput when there are validation errors", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      search: "John Doe",
      suggestions: [],
      showSuggestions: false,
      userSelected: { athleteName: "John", athleteLastName: "Doe" },
      isModalOpen: {
        createModal: true,
        progressModal: false,
      },
      measurementProgressList: { totalRecords: 0, items: [] },
      MeasurementProgressColumns: [],
      measurementProgressByLastMonth: [],
      graphicValues: [],
      errorModal: false,
      errorMessage: "",
      measurementsProgressError: {
        weightError: true,
        heightError: true,
        gluteusError: true,
        bicepsError: true,
        chestError: true,
        waistError: true,
        thighError: false,
        calfError: true,
        shouldersError: true,
        forearmError: true,
      },
      setErrorModal: jest.fn(),
      handleChange: jest.fn(),
      handleSelectSuggestion: jest.fn(),
      toggleModal: jest.fn(),
      handleOpenModal: jest.fn(),
      setField: jest.fn(),
      handleSubmit: jest.fn((e) => e.preventDefault()),
      handleSetNumPage: jest.fn(),
    });

    render(<UserProgress />);

    // Verificamos el mensaje de error para "Peso"
    const weightFormInput = screen.getByTestId("FormInput-Peso (kg)");
    expect(
      within(weightFormInput).getByTestId("error-message-Peso (kg)")
    ).toHaveTextContent("Por favor ingresa un peso valido");

    // Verificamos el mensaje de error para "Altura"
    const heightFormInput = screen.getByTestId("FormInput-Altura (cm)");
    expect(
      within(heightFormInput).getByTestId("error-message-Altura (cm)")
    ).toHaveTextContent("Por favor ingresa una altura valida");

    // Repetimos para otros campos con errores
    const bicepsFormInput = screen.getByTestId("FormInput-Biceps (cm)");
    expect(
      within(bicepsFormInput).getByTestId("error-message-Biceps (cm)")
    ).toHaveTextContent("Por favor ingresa una medida válida");

    const waistFormInput = screen.getByTestId("FormInput-Cintura (cm)");
    expect(
      within(waistFormInput).getByTestId("error-message-Cintura (cm)")
    ).toHaveTextContent("Por favor ingresa una medida válida");

    const calfFormInput = screen.getByTestId("FormInput-Pantorrilla (cm)");
    expect(
      within(calfFormInput).getByTestId("error-message-Pantorrilla (cm)")
    ).toHaveTextContent("Por favor ingresa una medida válida");

    const chestFormInput = screen.getByTestId("FormInput-Pecho (cm)");
    expect(
      within(chestFormInput).getByTestId("error-message-Pecho (cm)")
    ).toHaveTextContent("Por favor ingresa una medida válida");

    const gluteusFormInput = screen.getByTestId("FormInput-Gluteos (cm)");
    expect(
      within(gluteusFormInput).getByTestId("error-message-Gluteos (cm)")
    ).toHaveTextContent("Por favor ingresa una medida válida");
  });
});
