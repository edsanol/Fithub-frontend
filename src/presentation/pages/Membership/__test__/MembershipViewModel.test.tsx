import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import ViewModel from "../ViewModel";
import { isNotEmpty, isValidName, isValidNumber } from "@/presentation/helpers";

// Mocks
jest.mock("@/config/inversifyContainer");
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/presentation/helpers", () => ({
  isNotEmpty: jest.fn(),
  isValidEmail: jest.fn(),
  isValidGenre: jest.fn(),
  isValidName: jest.fn(),
  isValidPhone: jest.fn(),
  isValidNumber: jest.fn(),
}));

describe("ViewModel for Membership", () => {
  let mockGetMembershipListUseCase: jest.Mock;
  let mockRegisterMembershipUseCase: jest.Mock;
  let mockEditMembershipUseCase: jest.Mock;
  let mockDeleteMembershipUseCase: jest.Mock;

  beforeEach(() => {
    // Mocks para los casos de uso
    mockGetMembershipListUseCase = jest.fn();
    mockRegisterMembershipUseCase = jest.fn();
    mockEditMembershipUseCase = jest.fn();
    mockDeleteMembershipUseCase = jest.fn();

    (container.get as jest.Mock).mockImplementation((type) => {
      switch (type) {
        case TYPES.GetMembershipListUseCase:
          return { execute: mockGetMembershipListUseCase };
        case TYPES.RegisterMembershipUseCase:
          return { execute: mockRegisterMembershipUseCase };
        case TYPES.EditMembershipUseCase:
          return { execute: mockEditMembershipUseCase };
        case TYPES.DeleteMembershipUseCase:
          return { execute: mockDeleteMembershipUseCase };
      }
    });

    // Mock para useSession
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { gymId: 1 },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(result.current.membershipList.totalRecords).toBe(0);
      expect(result.current.membership.membershipID).toBe(0);
      expect(result.current.isModalOpen.createModal).toBe(false);
    });
  });

  it("should set membership fields correctly", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("membershipName", "Premium");
    });

    expect(result.current.membership.membershipName).toBe("Premium");
  });

  it("should validate the membership form", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("membershipName", ""); // invalid name
      result.current.setField("cost", "0"); // invalid cost
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.membershipError.membershipNameError).toBe(true);
    expect(result.current.membershipError.costError).toBe(true);
  });

  it("should call registerMembershipUseCase when creating a membership", async () => {
    (isValidName as jest.Mock).mockReturnValue(true);
    (isValidNumber as jest.Mock).mockReturnValue(true);
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("membershipName", "Premium");
      result.current.setField("cost", "100");
    });

    mockRegisterMembershipUseCase.mockResolvedValue(true);

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(mockRegisterMembershipUseCase).toHaveBeenCalled();
  });

  it("Shoul show error when registerMembershipUseCase return false", async () => {
    (isValidName as jest.Mock).mockReturnValue(true);
    (isValidNumber as jest.Mock).mockReturnValue(true);
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("membershipName", "Premium");
      result.current.setField("cost", "100");
    });

    mockRegisterMembershipUseCase.mockResolvedValue(false);

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.errorRequest).toBe("Error");
  });

  it("Should show error when registerMembershipUseCase throws an error", async () => {
    (isValidName as jest.Mock).mockReturnValue(true);
    (isValidNumber as jest.Mock).mockReturnValue(true);
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("membershipName", "Premium");
      result.current.setField("cost", "100");
    });

    mockRegisterMembershipUseCase.mockRejectedValue({
      response: { data: { message: "Error fetching membership" } },
    }),
      await act(async () => {
        await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
      });

    waitFor(() => {
      expect(result.current.error).toBe(true);
      expect(result.current.errorMessage).toBe("Error fetching membership");
    });
  });

  it("should get membership list on load", async () => {
    const { result } = renderHook(() => ViewModel());

    mockGetMembershipListUseCase.mockResolvedValue({
      totalRecords: 2,
      items: [{ membershipID: 1, membershipName: "Basic" }],
    });

    expect(mockGetMembershipListUseCase).toHaveBeenCalledWith({
      textFilter: "1",
      numRecordsPage: 7,
    });

    waitFor(() => {
      expect(result.current.membershipList.totalRecords).toBe(2);
    });
  });

  it("should call deleteMembershipUseCase when deleting a membership", async () => {
    const { result } = renderHook(() => ViewModel());

    mockDeleteMembershipUseCase.mockResolvedValue(true);

    await act(async () => {
      await result.current.deleteMembership(1);
    });

    waitFor(() => {
      expect(mockDeleteMembershipUseCase).toHaveBeenCalledWith(1);
    });
  });

  it("should open the correct modal when calling handleOpenModal", async () => {
    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleOpenModal("createModal");
    });

    expect(result.current.isModalOpen.createModal).toBe(true);
    expect(result.current.modalMode).toBe("create");
  });

  it("Should show error when idGym is 0", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { gymId: 0 },
      },
    });

    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(result.current.errorRequest).toBe("Error");
    });
  });
});
