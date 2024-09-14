import container from "@/config/inversifyContainer";
import { act, renderHook } from "@testing-library/react";
import ViewModel from "../ViewModel";

jest.mock("@/config/inversifyContainer", () => ({
  get: jest.fn(),
}));

describe("ViewModel for RecoveryPassword", () => {
  let mockRecoverPasswordUseCase: any;

  beforeEach(() => {
    mockRecoverPasswordUseCase = {
      execute: jest.fn().mockResolvedValue(true),
    };

    (container.get as jest.Mock).mockReturnValue(mockRecoverPasswordUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => ViewModel());

    expect(result.current.emailError).toBe(false);
    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.erroModal).toBe(false);
    expect(result.current.errorMessage).toBe("");
  });

  it("should validate email format correctly", async () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleEmail("invalid-email");
    });
    
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.emailError).toBe(true);

    act(() => {
      result.current.handleEmail("test@example.com");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.emailError).toBe(false);
  });

  it("should call recoverPasswordUseCase on valid form submission", async () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleEmail("test@example.com");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(mockRecoverPasswordUseCase.execute).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(result.current.isModalOpen).toBe(true);
  });

  it("should handle API error when recoverPasswordUseCase fails", async () => {
    (mockRecoverPasswordUseCase.execute as jest.Mock).mockRejectedValue({
      response: { data: { message: "Error al enviar el correo" } },
    });

    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleEmail("test@example.com");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.erroModal).toBe(true);
    expect(result.current.errorMessage).toBe("Error al enviar el correo");
  });

  it("should handle API error when recoverPasswordUseCase return false", async () => {
    (mockRecoverPasswordUseCase.execute as jest.Mock).mockResolvedValue(false);

    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleEmail("test@mail.com");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.error).toBe("error");
  });

  it("should toggle modal visibility", () => {
    const { result } = renderHook(() => ViewModel());

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
