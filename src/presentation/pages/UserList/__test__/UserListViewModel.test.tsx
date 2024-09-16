import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ViewModel from "../ViewModel";

// Mock de las dependencias
jest.mock("next-auth/react");
jest.mock("next/navigation");
jest.mock("@/config/inversifyContainer");

// Mock de useSession
const mockUseSession = useSession as jest.Mock;
mockUseSession.mockReturnValue({
  data: {
    user: {
      gymId: 1,
    },
  },
  status: "authenticated",
});

// Mock de useRouter
const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.Mock;
mockUseRouter.mockReturnValue({
  push: mockPush,
});

// Mock de los casos de uso
const mockGetAthleteUserListUseCase = {
  execute: jest.fn(),
};

const mockUpdateMembershipToAthleteUseCase = {
  execute: jest.fn(),
};

const mockGetAthleteUserByIdUseCase = {
  execute: jest.fn(),
};

const mockDeleteAthleteUserUseCase = {
  execute: jest.fn(),
};

const mockGetMembershipByGymIdUseCase = {
  execute: jest.fn(),
};

// Mock del contenedor de Inversify
const mockContainerGet = container.get as jest.Mock;
mockContainerGet.mockImplementation((type) => {
  switch (type) {
    case TYPES.GetAthleteUserListUseCase:
      return mockGetAthleteUserListUseCase;
    case TYPES.UpdateMembershipToAthleteUseCase:
      return mockUpdateMembershipToAthleteUseCase;
    case TYPES.GetAthleteUserByIdUseCase:
      return mockGetAthleteUserByIdUseCase;
    case TYPES.DeleteAthleteUserUseCase:
      return mockDeleteAthleteUserUseCase;
    case TYPES.GetMembershipByGymIdUseCase:
      return mockGetMembershipByGymIdUseCase;
    default:
      return null;
  }
});

describe("User List ViewModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería inicializarse con el estado predeterminado", () => {
    const { result } = renderHook(() => ViewModel());

    expect(result.current.athletesList).toEqual({
      totalRecords: 0,
      items: [],
    });
    expect(result.current.athleteUser).toEqual({
      athleteId: 0,
      athleteName: "",
      athleteLastName: "",
      email: "",
      phoneNumber: "",
      birthDate: "",
      genre: "",
      idGym: 0,
      gymName: "",
      registerDate: "",
      status: true,
      membershipName: "",
      cardAccessCode: "",
    });
    expect(result.current.isModalOpen).toEqual({
      detailsModal: false,
      deleteModal: false,
      editMembershipModal: false,
    });
    expect(result.current.membership).toEqual([]);
  });

  it("debería llamar a getMembershipByGymId cuando idGym cambia", async () => {
    mockGetMembershipByGymIdUseCase.execute.mockResolvedValue([]);

    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(mockGetMembershipByGymIdUseCase.execute).toHaveBeenCalled();
    });
  });

  it("debería mostrar el model de error cuando getMembershipByGymId falle", async () => {
    const errorMessage = "Error al obtener la lista de membresías";
    mockGetMembershipByGymIdUseCase.execute.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(result.current.errorModal).toBe(true);
      expect(result.current.errorMessage).toBe(errorMessage);
    });
  });

  it("debería obtener la lista de atletas al llamar a handleSetNumPage", async () => {
    const mockAthleteListResponse = {
      totalRecords: 10,
      items: [
        {
          athleteId: 1,
          athleteName: "John",
          athleteLastName: "Doe",
          email: "john@example.com",
          phoneNumber: "1234567890",
          birthDate: "1990-01-01",
          genre: "Male",
          idGym: 1,
          gymName: "Gym 1",
          registerDate: "2021-01-01",
          status: true,
          membershipName: "Gold",
          cardAccessCode: "1234",
          startDate: "2021-01-01",
          endDate: "2022-01-01",
        },
      ],
    };

    mockGetAthleteUserListUseCase.execute.mockResolvedValue(
      mockAthleteListResponse
    );

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSetNumPage(1);
    });

    expect(mockGetAthleteUserListUseCase.execute).toHaveBeenCalledWith({
      numRecordsPage: 7,
      numPage: 1,
    });

    expect(result.current.athletesList).toEqual(mockAthleteListResponse);
  });

  it("debería actualizar la membresía y cerrar el modal", async () => {
    mockUpdateMembershipToAthleteUseCase.execute.mockResolvedValue(true);
    mockGetAthleteUserListUseCase.execute.mockResolvedValue({
      totalRecords: 10,
      items: [],
    });

    const { result } = renderHook(() => ViewModel());

    const fakeEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.updateMembership(fakeEvent);
    });

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(mockUpdateMembershipToAthleteUseCase.execute).toHaveBeenCalled();

    expect(mockGetAthleteUserListUseCase.execute).toHaveBeenCalledWith({
      numRecordsPage: 7,
      numPage: 1,
    });

    expect(result.current.isModalOpen.editMembershipModal).toBe(false);
  });

  it("debería mostrar el modal de error al actualizar la membresía", async () => {
    const errorMessage = "Error al actualizar la membresía";
    mockUpdateMembershipToAthleteUseCase.execute.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    const { result } = renderHook(() => ViewModel());

    const fakeEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.updateMembership(fakeEvent);
    });

    expect(result.current.errorModal).toBe(true);
    expect(result.current.errorMessage).toBe(errorMessage);
  });

  it("debería obtener el atleta por ID y abrir el modal", async () => {
    const mockAthleteUser = {
      athleteId: 1,
      athleteName: "John",
      athleteLastName: "Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      birthDate: "1990-01-01",
      genre: "Male",
      idGym: 1,
      gymName: "Gym 1",
      registerDate: "2021-01-01",
      status: true,
      membershipName: "Gold",
      cardAccessCode: "1234",
    };

    mockGetAthleteUserByIdUseCase.execute.mockResolvedValue(mockAthleteUser);

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleOpenModal(1, "detailsModal");
    });

    expect(mockGetAthleteUserByIdUseCase.execute).toHaveBeenCalledWith(1);

    expect(result.current.athleteUser).toEqual(mockAthleteUser);
    expect(result.current.isModalOpen.detailsModal).toBe(true);
  });

  it("debería mostrar el modal de error al obtener el atleta por ID", async () => {
    const errorMessage = "Error al obtener el atleta";
    mockGetAthleteUserByIdUseCase.execute.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleOpenModal(1, "detailsModal");
    });

    expect(result.current.errorModal).toBe(true);
    expect(result.current.errorMessage).toBe(errorMessage);
  });

  it("debería eliminar el atleta y cerrar el modal", async () => {
    mockDeleteAthleteUserUseCase.execute.mockResolvedValue(true);
    mockGetAthleteUserListUseCase.execute.mockResolvedValue({
      totalRecords: 0,
      items: [],
    });

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.deleteAthleteUser(1);
    });

    expect(mockDeleteAthleteUserUseCase.execute).toHaveBeenCalledWith(1);

    expect(mockGetAthleteUserListUseCase.execute).toHaveBeenCalledWith({
      numRecordsPage: 7,
      numPage: 1,
    });

    expect(result.current.isModalOpen.deleteModal).toBe(false);
  });

  it("debería mostrar el modal de error al eliminar el atleta", async () => {
    const errorMessage = "Error al eliminar el atleta";
    mockDeleteAthleteUserUseCase.execute.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.deleteAthleteUser(1);
    });

    expect(result.current.errorModal).toBe(true);
    expect(result.current.errorMessage).toBe(errorMessage);
  });

  it("debería redirigir al usuario al hacer clic en editar", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleRedirect(1);
    });

    expect(mockPush).toHaveBeenCalledWith("/create-user/1");
  });

  it("debería alternar el estado del modal", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.toggleModal("detailsModal");
    });

    expect(result.current.isModalOpen.detailsModal).toBe(true);

    act(() => {
      result.current.toggleModal("detailsModal");
    });

    expect(result.current.isModalOpen.detailsModal).toBe(false);
  });

  it("debería manejar errores en handleSubmit", async () => {
    const errorMessage = "Error al obtener la lista de atletas";
    mockGetAthleteUserListUseCase.execute.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSetNumPage(1);
    });

    expect(result.current.errorModal).toBe(true);
    expect(result.current.errorMessage).toBe(errorMessage);
  });
});
