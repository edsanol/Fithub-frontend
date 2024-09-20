import { act, renderHook } from "@testing-library/react";
import container from "@/config/inversifyContainer";
import { isValidEmail } from "@/presentation/helpers";
import ViewModel from "../ViewModel";

jest.mock("@/config/inversifyContainer");
jest.mock("@/presentation/helpers", () => ({
  isValidEmail: jest.fn(),
}));

describe("Unsubscribe ViewModel", () => {
  const mockUnsubscribeUseCase = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    (container.get as jest.Mock).mockReturnValue(mockUnsubscribeUseCase);

    jest.clearAllMocks();

    Object.defineProperty(window, "location", {
      writable: true,
      value: { href: "" },
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => ViewModel());

    expect(result.current.unsubscribeData).toEqual({ email: "" });
    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.emailError).toBe(false);
    expect(result.current.erroModal).toBe(false);
    expect(result.current.errorMessage).toBe("");
    expect(result.current.error).toBe("");
  });

  it("should update email when handleEmail is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleEmail("test@example.com");
    });

    expect(result.current.unsubscribeData.email).toBe("test@example.com");
  });

  it("should validate the form and set emailError when email is invalid", async () => {
    (isValidEmail as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(isValidEmail).toHaveBeenCalledWith("");
    expect(result.current.emailError).toBe(true);
    expect(result.current.isModalOpen).toBe(true);
    expect(mockUnsubscribeUseCase.execute).not.toHaveBeenCalled();
  });

  it("should call UnsubscribeAthleteUserUseCase and navigate on successful submission", async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    mockUnsubscribeUseCase.execute.mockResolvedValue(true);

    delete (window as any).location;
    (window as any).location = { href: "" };

    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleEmail("test@example.com");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(isValidEmail).toHaveBeenCalledWith("test@example.com");
    expect(mockUnsubscribeUseCase.execute).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(result.current.isModalOpen).toBe(false);
    expect(window.location.href).toBe("/");
  });

  it("should handle failure in UnsubscribeAthleteUserUseCase", async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    mockUnsubscribeUseCase.execute.mockResolvedValue(false);

    const { result } = renderHook(() => ViewModel());

    // Simular ingreso de email
    act(() => {
      result.current.handleEmail("test@example.com");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(isValidEmail).toHaveBeenCalledWith("test@example.com");
    expect(mockUnsubscribeUseCase.execute).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(result.current.error).toBe("error");
    expect(result.current.isModalOpen).toBe(false);
    expect(window.location.href).toBe("");
  });

  it("should handle errors thrown during submission", async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    mockUnsubscribeUseCase.execute.mockRejectedValue({
      response: { data: { message: "Desuscripción fallida" } },
    });

    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleEmail("test@example.com");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(isValidEmail).toHaveBeenCalledWith("test@example.com");
    expect(mockUnsubscribeUseCase.execute).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(result.current.erroModal).toBe(true);
    expect(result.current.errorMessage).toBe("Desuscripción fallida");
    expect(result.current.isModalOpen).toBe(false);
  });

  it("should toggle modal when toggleModal is called", () => {
    const { result } = renderHook(() => ViewModel());

    expect(result.current.isModalOpen).toBe(false);

    act(() => {
      result.current.toggleModal();
    });

    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.toggleModal();
    });

    expect(result.current.isModalOpen).toBe(false);
  });
});
