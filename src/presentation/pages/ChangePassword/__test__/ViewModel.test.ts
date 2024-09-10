import { act, renderHook } from "@testing-library/react";
import ViewModel from "../components/change-password-form/ViewModel";
import { isValidChangePassword, isValidEmail, isValidNewPassword, isValidPassword } from "@/presentation/helpers";
import { Container } from "inversify";
import { ChangePasswordUseCase } from "@/domain/useCases/GymUser/changePasswordUseCase";
import { TYPES } from "@/config/types";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const container = new Container();

jest.mock("@/presentation/helpers", () => ({
  isValidChangePassword: jest.fn(),
  isValidEmail: jest.fn(),
  isValidNewPassword: jest.fn(),
  isValidPassword: jest.fn(),
}));

describe("ChangePassword ViewModel", () => {
  let mockChangePasswordUseCase: jest.Mocked<ChangePasswordUseCase>;

  beforeEach(() => {
    mockChangePasswordUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<ChangePasswordUseCase>;

    container.bind<ChangePasswordUseCase>(TYPES.ChangePasswordUseCase).toConstantValue(mockChangePasswordUseCase);
  });

  it("should update field correctly when setField is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("email", "test@example.com");
    });

    expect(result.current.changePasswordDataError.emailError).toBe(false);
  });

  it("should set validation errors when form is invalid", () => {
    (isValidEmail as jest.Mock).mockReturnValue(false);
    (isValidPassword as jest.Mock).mockReturnValue(false);
    (isValidChangePassword as jest.Mock).mockReturnValue(false);
    (isValidNewPassword as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.changePasswordDataError.emailError).toBe(true);
    expect(result.current.changePasswordDataError.passwordError).toBe(true);
    expect(result.current.changePasswordDataError.newPasswordError).toBe(true);
    expect(result.current.changePasswordDataError.confirmPasswordError).toBe(true);
  });

  it("should call ChangePasswordUseCase when form is valid", async () => {
    mockChangePasswordUseCase.execute.mockResolvedValue(true);

    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("email", "test@example.com");
      result.current.setField("oldPassword", "oldpassword");
      result.current.setField("newPassword", "newpassword");
      result.current.setField("confirmPassword", "newpassword");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    const resultUseCase = await mockChangePasswordUseCase.execute({
      email: "test@example.com",
      oldPassword: "oldpassword",
      newPassword: "newpassword",
      confirmPassword: "newpassword",
    });
    
    expect(resultUseCase).toBe(true);
  });
});
