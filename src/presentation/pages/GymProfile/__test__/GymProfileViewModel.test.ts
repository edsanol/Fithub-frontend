import { act, renderHook, waitFor } from "@testing-library/react";
import ViewModel from "../gym-profile-form/ViewModel";
import { GymUser } from "@/domain/entities/GymUser";
import container from "@/config/inversifyContainer";
import {
  isNotEmpty,
  isValidEmail,
  isValidName,
  isValidNit,
  isValidPhone,
} from "@/presentation/helpers";

// Mocks para router y session
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { user: { gymId: 1 } },
  })),
}));

// Mock de los helpers de validación
jest.mock("@/presentation/helpers", () => ({
  isValidEmail: jest.fn(),
  isValidName: jest.fn(),
  isValidPhone: jest.fn(),
  isValidNit: jest.fn(),
  isNotEmpty: jest.fn(),
}));

// Mock del inversify container
jest.mock("@/config/inversifyContainer", () => ({
  get: jest.fn(),
}));

const mockgetGymUserByIdUseCase: GymUser = {
  gymName: "Gym Name",
  email: "test@mail.com",
  address: "Gym Address",
  phoneNumber: "123456789",
  registerDate: new Date().toISOString(),
  subscriptionPlan: "Plan",
  comments: "Comments",
  nit: "123456789",
};

describe("Gym Profile ViewModel", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const getGymUserByIdUseCase = {
      execute: jest.fn().mockResolvedValue(mockgetGymUserByIdUseCase),
    };
    (container.get as jest.Mock).mockReturnValue(getGymUserByIdUseCase);
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(result.current.gymUserData).toEqual({
        gymName: "",
        email: "",
        address: "",
        phoneNumber: "",
        registerDate: expect.any(String),
        subscriptionPlan: "",
        comments: "",
        nit: "",
      });

      expect(result.current.gymUserDataError).toEqual({
        gymNameError: false,
        emailError: false,
        addressError: false,
        phoneNumberError: false,
        nitError: false,
      });
    });
  });

  it("should set gym user data", async () => {
    const { result } = renderHook(() => ViewModel());

    await waitFor(() => {
      expect(result.current.gymUserData).toEqual(mockgetGymUserByIdUseCase);
    });
  });

  it("should show error when getGymUserByIdUseCase return false", async () => {
    const getGymUserByIdUseCase = {
      execute: jest.fn().mockResolvedValue(false),
    };
    (container.get as jest.Mock).mockReturnValue(getGymUserByIdUseCase);

    const { result } = renderHook(() => ViewModel());

    await waitFor(() => {
      expect(result.current.error).toBe("Error");
    });
  });

  it("should set error modal when getGymUserByIdUseCase throws an error", async () => {
    const getGymUserByIdUseCase = {
      execute: jest
        .fn()
        .mockRejectedValue({ response: { data: { message: "Error" } } }),
    };
    (container.get as jest.Mock).mockReturnValue(getGymUserByIdUseCase);

    const { result } = renderHook(() => ViewModel());

    await waitFor(() => {
      expect(result.current.errorModal).toBe(true);
      expect(result.current.errorMessage).toBe("Error");
    });
  });

  it("should validate form and set errors when handleSubmit is called with invalid data", async () => {
    (isValidEmail as jest.Mock).mockReturnValue(false);
    (isValidName as jest.Mock).mockReturnValue(false);
    (isNotEmpty as jest.Mock).mockReturnValue(false);
    (isValidPhone as jest.Mock).mockReturnValue(false);
    (isValidNit as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.gymUserDataError.emailError).toBe(true);
    expect(result.current.gymUserDataError.gymNameError).toBe(true);
    expect(result.current.gymUserDataError.phoneNumberError).toBe(true);
    expect(result.current.gymUserDataError.nitError).toBe(true);
    expect(result.current.gymUserDataError.addressError).toBe(true);
  });

  it("should call EditGymUserUseCase when form is valid", async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isValidName as jest.Mock).mockReturnValue(true);
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    (isValidPhone as jest.Mock).mockReturnValue(true);
    (isValidNit as jest.Mock).mockReturnValue(true);

    const editGymUserUseCase = {
      execute: jest.fn().mockResolvedValue(true),
    };
    (container.get as jest.Mock).mockReturnValue(editGymUserUseCase);

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(editGymUserUseCase.execute).toHaveBeenCalled();
    expect(result.current.errorModal).toBe(false);
  });

  it("should handle error and show modal when EditGymUserUseCase fails", async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isValidName as jest.Mock).mockReturnValue(true);
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    (isValidPhone as jest.Mock).mockReturnValue(true);
    (isValidNit as jest.Mock).mockReturnValue(true);

    const editGymUserUseCase = {
      execute: jest.fn().mockRejectedValue({
        response: { data: { message: "Error updating gym user" } },
      }),
    };
    (container.get as jest.Mock).mockReturnValue(editGymUserUseCase);

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(editGymUserUseCase.execute).toHaveBeenCalled();
    expect(result.current.errorModal).toBe(true);
    expect(result.current.errorMessage).toBe("Error updating gym user");
  });

  it("should show error when EditGymUserUseCase return false", async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isValidName as jest.Mock).mockReturnValue(true);
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    (isValidPhone as jest.Mock).mockReturnValue(true);
    (isValidNit as jest.Mock).mockReturnValue(true);

    const editGymUserUseCase = {
      execute: jest.fn().mockResolvedValue(false),
    };
    (container.get as jest.Mock).mockReturnValue(editGymUserUseCase);

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(editGymUserUseCase.execute).toHaveBeenCalled();
    expect(result.current.error).toBe("Error");
  });

  it("should set setIsClicked to true when handleIsClicked is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleClick();
    });

    expect(result.current.isClicked).toBe(true);
  });

  it("should update gymUserData field when setField is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("email", "test@example.com");
    });

    expect(result.current.gymUserData.email).toBe("test@example.com");
  });
});
