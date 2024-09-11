import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import ViewModel from "../ViewModel";

jest.mock("next-auth/react");
jest.mock("@/config/inversifyContainer");

describe("ViewModel - Discounts", () => {
  const mockSession = {
    data: {
      user: { gymId: 123, name: "Test User", email: "test@example.com" },
    },
  };

  const mockGetDiscountsListUseCase = {
    execute: jest.fn(),
  };

  const mockGetMembershipListUseCase = {
    execute: jest.fn(),
  };

  const mockRegisterDiscountUseCase = {
    execute: jest.fn(),
  };

  const mockEditDiscountUseCase = {
    execute: jest.fn(),
  };

  const mockDeleteDiscountUseCase = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    // Mockea la sesión
    (useSession as jest.Mock).mockReturnValue(mockSession);

    // Mockea el contenedor inversify para devolver los casos de uso
    (container.get as jest.Mock).mockImplementation((type) => {
      switch (type) {
        case TYPES.GetDiscountsListUseCase:
          return mockGetDiscountsListUseCase;
        case TYPES.GetMembershipListUseCase:
          return mockGetMembershipListUseCase;
        case TYPES.RegisterDiscountUseCase:
          return mockRegisterDiscountUseCase;
        case TYPES.EditDiscountUseCase:
          return mockEditDiscountUseCase;
        case TYPES.DeleteDiscountUseCase:
          return mockDeleteDiscountUseCase;
        default:
          return null;
      }
    });
  });

  it("should initialize with gymId from session and fetch membership and discount lists", async () => {
    mockGetMembershipListUseCase.execute.mockResolvedValue({
      totalRecords: 1,
      items: [{ idMembership: 1, name: "Membership 1" }],
    });

    mockGetDiscountsListUseCase.execute.mockResolvedValue({
      totalRecords: 1,
      items: [{ discountId: 1, discountPercentage: 10 }],
    });

    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(result.current.membershipList.items).toEqual([
        { idMembership: 1, name: "Membership 1" },
      ]);
      expect(result.current.discountsList.items).toEqual([
        { discountId: 1, discountPercentage: 10 },
      ]);
    });
  });

  it("should set discount correctly when handleSetDiscountPercentage is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleSetDiscountPercentage("15");
    });

    expect(result.current.discount.discountPercentage).toBe(15);
  });

  it("should not submit form if validation fails", async () => {
    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(mockRegisterDiscountUseCase.execute).not.toHaveBeenCalled();
  });

  it("should call RegisterDiscountUseCase on handleSubmit with valid form", async () => {
    mockRegisterDiscountUseCase.execute.mockResolvedValue(true);

    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleSetDiscountPercentage("15");
      result.current.handleSetStartDate("2024-01-01");
      result.current.handleSetEndDate("2024-12-31");
      result.current.handleSetIdMembership("1");
      result.current.handleSetComments("Test discount");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(mockRegisterDiscountUseCase.execute).toHaveBeenCalledWith({
      discountPercentage: 15,
      startDate: "2024-01-01T00:00:00.000Z",
      endDate: "2024-12-31T00:00:00.000Z",
      idMembership: 1,
      comments: "Test discount",
      idGym: 123,
    });
  });
});
