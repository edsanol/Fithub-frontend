import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { act, renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ViewModel from "../components/register-form/ViewModel";
import { isNotEmpty, isValidEmail, isValidName, isValidNit, isValidPassword, isValidPhone } from "@/presentation/helpers";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  useSession: jest.fn(() => ({
    data: { user: { token: "test-token", refreshToken: "test-refresh-token" } },
  })),
}));

jest.mock("@/presentation/helpers", () => ({
  isValidEmail: jest.fn(),
  isValidPassword: jest.fn(),
  isValidName: jest.fn(),
  isValidPhone: jest.fn(),
  isValidNit: jest.fn(),
  isNotEmpty: jest.fn(),
}));


jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

jest.mock("@/config/inversifyContainer");

describe("Register ViewModel", () => {
  let registerGymUserUseCaseMock: jest.Mock;
  let routerMock: { push: jest.Mock };

  beforeEach(() => {
    registerGymUserUseCaseMock = jest.fn().mockResolvedValue(true);
    (container.get as jest.Mock) = jest.fn((type) => {
      if (type === TYPES.RegisterGymUserUseCase) {
        return registerGymUserUseCaseMock;
      }
    });
    routerMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => ViewModel());

    expect(result.current.gymDataError).toEqual({
      gymNameError: false,
      emailError: false,
      passwordError: false,
      addressError: false,
      phoneNumberError: false,
      nitError: false,
    });
  });

  it("should update field values when setField is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("gymName", "Test Gym");
    });

    expect(result.current.gymDataError.gymNameError).toBe(false);
  });

  it("should validate form fields when handleIsValidForm is called", async () => {
    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.gymDataError.emailError).toBe(true);
    expect(result.current.gymDataError.passwordError).toBe(true);
  });

  it("should handle registration errors", async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isValidPassword as jest.Mock).mockReturnValue(true);
    (isValidName as jest.Mock).mockReturnValue(true);
    (isValidPhone as jest.Mock).mockReturnValue(true);
    (isValidNit as jest.Mock).mockReturnValue(true);
    (isNotEmpty as jest.Mock).mockReturnValue(true);

    registerGymUserUseCaseMock.mockRejectedValueOnce({
      response: { data: { message: "Registration failed" } },
    });

    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("email", "test@test.com");
      result.current.setField("password", "ValidPassword123");
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.errorModal).toBe(true);
    expect(result.current.errorMessage).toBe("Error al realizar el registro");
  });
});
