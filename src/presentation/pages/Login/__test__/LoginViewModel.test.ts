import { act, renderHook } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ViewModel from "../components/login-form/ViewModel";
import { cipherData } from "@/config/secureData";
import Cookies from "js-cookie";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

jest.mock("@/config/secureData", () => ({
  cipherData: jest.fn(),
}));

describe("ViewModel", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSession as jest.Mock).mockReturnValue({ data: null });
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => ViewModel());

    expect(result.current.emailError).toBe(false);
    expect(result.current.passwordError).toBe(false);
    expect(result.current.handleSubmit).toBeInstanceOf(Function);
    expect(result.current.handleSetEmail).toBeInstanceOf(Function);
    expect(result.current.handleSetPassword).toBeInstanceOf(Function);
  });

  it("should update email state when handleSetEmail is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleSetEmail("test@example.com");
    });

    expect(result.current.emailError).toBe(false);
    expect(result.current.handleSetEmail).toBeInstanceOf(Function);
  });

  it("should update password state when handleSetPassword is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleSetPassword("password123");
    });

    expect(result.current.passwordError).toBe(false);
  });

  it("should handle submit and call signIn with credentials", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ error: null });

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as any);
    });

    expect(signIn).toHaveBeenCalledWith("credentials", {
      email: "",
      password: "",
      redirect: false,
    });

    expect(result.current.emailError).toBe(false);
    expect(result.current.passwordError).toBe(false);
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  it("should set emailError and passwordError if signIn returns an error", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({
      error: "Invalid credentials",
    });

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as any);
    });

    expect(result.current.emailError).toBe(true);
    expect(result.current.passwordError).toBe(true);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should set authToken and refreshToken cookies when session is available", () => {
    const mockSession = {
      user: {
        token: "mockAuthToken",
        refreshToken: "mockRefreshToken",
      },
    };

    (useSession as jest.Mock).mockReturnValueOnce({ data: mockSession });
    (cipherData as jest.Mock).mockReturnValueOnce("encryptedRefreshToken");

    renderHook(() => ViewModel());

    expect(Cookies.set).toHaveBeenCalledWith("authToken", "mockAuthToken", {
      expires: 1,
    });
    expect(Cookies.set).toHaveBeenCalledWith(
      "refreshToken",
      "encryptedRefreshToken",
      { expires: 1 }
    );
  });
});
