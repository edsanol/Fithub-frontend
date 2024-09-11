import { act, renderHook, waitFor } from "@testing-library/react";
import ViewModel from "../components/change-password-form/ViewModel";
import container from "@/config/inversifyContainer";
import { ChangePasswordUseCase } from "@/domain/useCases/GymUser/changePasswordUseCase";
import { TYPES } from "@/config/types";
import { useRouter } from "next/navigation";
import {
  isValidChangePassword,
  isValidEmail,
  isValidNewPassword,
  isValidPassword,
} from "@/presentation/helpers";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/config/inversifyContainer");

jest.mock("@/domain/useCases/GymUser/changePasswordUseCase");

jest.mock("@/presentation/helpers", () => ({
  isValidChangePassword: jest.fn(),
  isValidEmail: jest.fn(),
  isValidNewPassword: jest.fn(),
  isValidPassword: jest.fn(),
}));

describe("ChangePassword ViewModel", () => {
  const pushMock = jest.fn();
  const setModalVisibleMock = jest.fn();
  const setModalMessageMock = jest.fn();
  const useReducerDispatchMock = jest.fn();
  let changePasswordUseCaseMock: any;

  beforeEach(() => {
    changePasswordUseCaseMock = {
      execute: jest.fn(),
    };
    (container.get as jest.Mock).mockReturnValue(changePasswordUseCaseMock);
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("should initialize state correctly", () => {
    const { result } = renderHook(() => ViewModel());
    expect(result.current.changePasswordDataError).toEqual({
      emailError: false,
      passwordError: false,
      newPasswordError: false,
      confirmPasswordError: false,
    });
    expect(result.current.modalVisible).toBe(false);
    expect(result.current.modalMessage).toBe("");
  });

  it("setField updates the field value", () => {
    const { result } = renderHook(() => ViewModel());
    act(() => {
      result.current.setField("email", "test@example.com");
    });
    expect(result.current.changePasswordDataError.emailError).toBe(false);
  });

  it("handleSubmit prevents submit if errors exist", async () => {
    const { result } = renderHook(() => ViewModel());
    act(() => {
      result.current.setField("email", "invalid");
    });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    });

    expect(pushMock).not.toHaveBeenCalled();
    expect(setModalVisibleMock).not.toHaveBeenCalled();
    expect(setModalMessageMock).not.toHaveBeenCalled();
  });

  it("handleSubmit should prevent default on form event", async () => {
    const preventDefault = jest.fn();
    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault,
        // other possibly necessary event properties
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(preventDefault).toHaveBeenCalled();
  });

  it("should call changePasswordUseCase on valid handleSubmit", async () => {
    const { result } = renderHook(() => ViewModel());
    changePasswordUseCaseMock.execute.mockResolvedValue(true);

    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isValidPassword as jest.Mock).mockReturnValue(true);
    (isValidChangePassword as jest.Mock).mockReturnValue(true);
    (isValidNewPassword as jest.Mock).mockReturnValue(true);

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(changePasswordUseCaseMock.execute).toHaveBeenCalled();
    expect(useRouter().push).toHaveBeenCalledWith("/dashboard");
  });

  it("should call changePasswordUseCase on valid handleSubmit but return false", async () => {
    const { result } = renderHook(() => ViewModel());
    changePasswordUseCaseMock.execute.mockResolvedValue(false);

    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isValidPassword as jest.Mock).mockReturnValue(true);
    (isValidChangePassword as jest.Mock).mockReturnValue(true);
    (isValidNewPassword as jest.Mock).mockReturnValue(true);

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(changePasswordUseCaseMock.execute).toHaveBeenCalled();
    expect(result.current.error).toBe("Error");
  });

  it("should call changePasswordUseCase on valid handleSubmit but but the request fails", async () => {
    const { result } = renderHook(() => ViewModel());
    changePasswordUseCaseMock.execute.mockRejectedValue({
      response: { data: { message: "Error" } },
    });

    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isValidPassword as jest.Mock).mockReturnValue(true);
    (isValidChangePassword as jest.Mock).mockReturnValue(true);
    (isValidNewPassword as jest.Mock).mockReturnValue(true);

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(changePasswordUseCaseMock.execute).toHaveBeenCalled();
    expect(result.current.modalVisible).toBe(true);
    expect(result.current.modalMessage).toBe("Error");
  });
});
