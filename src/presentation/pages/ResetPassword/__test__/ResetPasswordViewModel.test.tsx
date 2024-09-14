import container from "@/config/inversifyContainer";
import {
  isNotEmpty,
  isValidNewPassword,
  isValidPassword,
} from "@/presentation/helpers";
import { act, renderHook } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import ViewModel from "../ViewModel";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/config/inversifyContainer");
jest.mock("@/presentation/helpers", () => ({
  isNotEmpty: jest.fn(),
  isValidNewPassword: jest.fn(),
  isValidPassword: jest.fn(),
}));

describe("ResetPassword ViewModel", () => {
  const mockPush = jest.fn();
  const mockGet = jest.fn();
  const mockResetPasswordUseCase = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({ get: mockGet });
    (container.get as jest.Mock).mockReturnValue(mockResetPasswordUseCase);

    // Mock de las validaciones
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    (isValidPassword as jest.Mock).mockReturnValue(true);
    (isValidNewPassword as jest.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => ViewModel());

    expect(result.current.resetPasswordData).toEqual({
      token: "",
      newPassword: "",
      confirmPassword: "",
    });
    expect(result.current.resetPasswordDataError).toEqual({
      tokenError: false,
      newPasswordError: false,
      confirmPasswordError: false,
    });
  });

  it("should validate the form and set errors", async () => {
    (isNotEmpty as jest.Mock).mockReturnValueOnce(false); // Simulamos que falta el token
    (isValidPassword as jest.Mock).mockReturnValueOnce(false); // Contraseña inválida
    (isValidNewPassword as jest.Mock).mockReturnValueOnce(false); // Las contraseñas no coinciden

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.resetPasswordDataError).toEqual({
      tokenError: true,
      newPasswordError: true,
      confirmPasswordError: true,
    });

    expect(mockResetPasswordUseCase.execute).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should call ResetPasswordUseCase and navigate to /login on successful submission", async () => {
    (isNotEmpty as jest.Mock).mockReturnValue(true); // Token válido
    (isValidPassword as jest.Mock).mockReturnValue(true); // Contraseña válida
    (isValidNewPassword as jest.Mock).mockReturnValue(true); // Contraseñas coinciden

    mockResetPasswordUseCase.execute.mockResolvedValue(true);

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(mockResetPasswordUseCase.execute).toHaveBeenCalledWith({
      token: "",
      newPassword: "",
      confirmPassword: "",
    });

    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("should update new password when handleSetNewPassword is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleSetNewPassword("newPassword123");
    });

    expect(result.current.resetPasswordData.newPassword).toBe("newPassword123");
  });

  it("should update confirm password when handleSetConfirmPassword is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleSetConfirmPassword("confirmPassword123");
    });

    expect(result.current.resetPasswordData.confirmPassword).toBe(
      "confirmPassword123"
    );
  });

  it("should handle errors in ResetPasswordUseCase", async () => {
    mockResetPasswordUseCase.execute.mockResolvedValue(false);

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(mockResetPasswordUseCase.execute).toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
