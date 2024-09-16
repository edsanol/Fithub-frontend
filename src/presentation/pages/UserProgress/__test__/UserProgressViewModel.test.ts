import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { act, renderHook, waitFor } from "@testing-library/react";
import ViewModel from "../ViewModel";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { isValidMeasurement } from "@/presentation/helpers";
import { BarGraphicValues } from "@/domain/models/BarGraphicValues";

jest.mock("@/config/inversifyContainer", () => ({
  get: jest.fn(),
}));

const mockGetAthleteUserListUseCase = {
  execute: jest.fn(),
};

const mockGetMeasurementProgressListUseCase = {
  execute: jest.fn(),
};

const mockCreateMeasurementProgressUseCase = {
  execute: jest.fn(),
};

const mockGetMeasurementProgressByLastMonthUseCase = {
  execute: jest.fn(),
};

const mockGetMeasurementsGraphicUseCase = {
  execute: jest.fn(),
};

jest.mock("@/presentation/helpers", () => ({
  isValidMeasurement: jest.fn(),
}));

(container.get as jest.Mock).mockImplementation((type) => {
  switch (type) {
    case TYPES.GetAthleteUserListUseCase:
      return mockGetAthleteUserListUseCase;
    case TYPES.GetMeasurementProgressListUseCase:
      return mockGetMeasurementProgressListUseCase;
    case TYPES.CreateMeasurementProgressUseCase:
      return mockCreateMeasurementProgressUseCase;
    case TYPES.GetMeasurementProgressByLastMonthUseCase:
      return mockGetMeasurementProgressByLastMonthUseCase;
    case TYPES.GetMeasurementsGraphicUseCase:
      return mockGetMeasurementsGraphicUseCase;
    default:
      return null;
  }
});

describe("User Progress ViewModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct default state", () => {
    const { result } = renderHook(() => ViewModel());

    expect(result.current.search).toBe("");
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.showSuggestions).toBe(false);
    expect(result.current.userSelected).toEqual({
      athleteId: 0,
      athleteName: "",
      athleteLastName: "",
      email: "",
      phoneNumber: "",
      birthDate: "",
      genre: "",
      idGym: 0,
      registerDate: "",
      status: true,
      membershipName: "",
      cardAccessCode: "",
    });
    expect(result.current.isModalOpen).toEqual({
      createModal: false,
      progressModal: false,
    });
    expect(result.current.measurementProgressList).toEqual({
      totalRecords: 0,
      items: [],
    });
    expect(result.current.measurementProgressByLastMonth).toEqual([]);
    expect(result.current.graphicValues).toEqual([]);
    expect(result.current.errorModal).toBe(false);
    expect(result.current.errorMessage).toBe("");
    expect(result.current.measurementsProgressError).toEqual({
      gluteusError: false,
      bicepsError: false,
      chestError: false,
      waistError: false,
      thighError: false,
      calfError: false,
      shouldersError: false,
      forearmError: false,
      heightError: false,
      weightError: false,
    });
  });

  it("should update search and show suggestions when handleChange is called", async () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleChange("John");
    });

    expect(result.current.search).toBe("John");

    // Simulamos la respuesta del caso de uso
    const suggestions = [
      new AthleteUser({
        athleteId: 1,
        athleteName: "John",
        athleteLastName: "Doe",
        email: "john@example.com",
        phoneNumber: "123456789",
        birthDate: "1990-01-01",
        genre: "Male",
        registerDate: "2020-01-01",
        status: true,
      }),
    ];
    mockGetAthleteUserListUseCase.execute.mockResolvedValue({
      items: suggestions,
    });

    waitFor(() => {
      expect(mockGetAthleteUserListUseCase.execute).toHaveBeenCalledWith({
        numFilter: 1,
        numRecordsPage: 100,
        textFilter: "John",
      });

      expect(result.current.suggestions).toEqual(suggestions);
      expect(result.current.showSuggestions).toBe(true);
    });
  });

  it("should update userSelected and hide suggestions when handleSelectSuggestion is called", () => {
    const { result } = renderHook(() => ViewModel());

    const selectedUser = new AthleteUser({
      athleteId: 1,
      athleteName: "John",
      athleteLastName: "Doe",
      email: "john@example.com",
      phoneNumber: "123456789",
      birthDate: "1990-01-01",
      genre: "Male",
      registerDate: "2020-01-01",
      status: true,
    });

    act(() => {
      result.current.handleSelectSuggestion(selectedUser);
    });

    expect(result.current.search).toBe("John Doe");
    expect(result.current.userSelected).toEqual(selectedUser);
    expect(result.current.showSuggestions).toBe(false);
  });

  it("should validate the form and update measurementsProgressError", () => {
    const { result } = renderHook(() => ViewModel());

    // Simulamos valores inválidos
    act(() => {
      result.current.setField("weight", -1);
      result.current.setField("height", 0);
    });

    expect(result.current.measurementsProgressError).toEqual({
      gluteusError: false,
      bicepsError: false,
      chestError: false,
      waistError: false,
      thighError: false,
      calfError: false,
      shouldersError: false,
      forearmError: false,
      heightError: false,
      weightError: false,
    });
  });

  it("should handle form submission correctly when data is valid", async () => {
    (isValidMeasurement as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => ViewModel());

    // Simulamos valores válidos
    act(() => {
      result.current.setField("weight", 70);
      result.current.setField("height", 170);
      result.current.setField("idAthlete", 1);
    });

    // Simulamos usuario seleccionado
    act(() => {
      result.current.handleSelectSuggestion(
        new AthleteUser({
          athleteId: 1,
          athleteName: "John",
          athleteLastName: "Doe",
          email: "john@example.com",
          phoneNumber: "123456789",
          birthDate: "1990-01-01",
          genre: "Male",
          registerDate: "2020-01-01",
          status: true,
        })
      );
    });

    mockCreateMeasurementProgressUseCase.execute.mockResolvedValue(true);
    mockGetMeasurementProgressListUseCase.execute.mockResolvedValue({
      totalRecords: 1,
      items: [],
    });
    mockGetMeasurementProgressByLastMonthUseCase.execute.mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockCreateMeasurementProgressUseCase.execute).toHaveBeenCalled();
    expect(result.current.isModalOpen.createModal).toBe(false);
  });

  it("should toggle modal state correctly", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.toggleModal("createModal");
    });

    expect(result.current.isModalOpen.createModal).toBe(true);

    act(() => {
      result.current.toggleModal("createModal");
    });

    expect(result.current.isModalOpen.createModal).toBe(false);
  });

  it("should open progress modal and load graphic values when handleOpenModal is called", async () => {
    const { result } = renderHook(() => ViewModel());

    mockGetMeasurementsGraphicUseCase.execute.mockResolvedValue([
      new BarGraphicValues({
        time: "2024-01-01",
        value: 10,
      }),
      new BarGraphicValues({
        time: "2024-02-01",
        value: 12,
      }),
    ]);

    await act(async () => {
      await result.current.handleOpenModal("progressModal", "biceps");
    });

    expect(result.current.isModalOpen.progressModal).toBe(true);
    expect(mockGetMeasurementsGraphicUseCase.execute).toHaveBeenCalledWith(
      result.current.userSelected.athleteId,
      "biceps",
      "2024-01-01",
      "2024-12-31"
    );
    expect(result.current.graphicValues).toHaveLength(2);
  });
});
