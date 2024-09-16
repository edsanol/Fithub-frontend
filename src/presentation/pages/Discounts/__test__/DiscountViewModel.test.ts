import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import ViewModel from "../ViewModel";
import { isNotEmpty, isValidNumber } from "@/presentation/helpers";

jest.mock("next-auth/react");
jest.mock("@/config/inversifyContainer");

jest.mock("@/presentation/helpers", () => ({
  isNotEmpty: jest.fn(),
  isValidNumber: jest.fn(),
}));

// Mock the use cases
jest.mock("@/domain/useCases/Discounts/getDiscountsList");
jest.mock("@/domain/useCases/Discounts/registerDiscounts");
jest.mock("@/domain/useCases/Membership/getMembershipListUseCase");
jest.mock("@/domain/useCases/Discounts/getDiscountById");
jest.mock("@/domain/useCases/Discounts/editDiscount");
jest.mock("@/domain/useCases/Discounts/deleteDiscount");

describe("Discounts ViewModel", () => {
  let getDiscountsListUseCaseMock: any;
  let registerDiscountUseCaseMock: any;
  let getMembershipListUseCaseMock: any;
  let getDiscountByIdUseCaseMock: any;
  let editDiscountUseCaseMock: any;
  let deleteDiscountUseCaseMock: any;
  const sessionMock = { user: { gymId: 1 } };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    getDiscountsListUseCaseMock = { execute: jest.fn() };
    registerDiscountUseCaseMock = { execute: jest.fn() };
    getMembershipListUseCaseMock = { execute: jest.fn() };
    getDiscountByIdUseCaseMock = { execute: jest.fn() };
    editDiscountUseCaseMock = { execute: jest.fn() };
    deleteDiscountUseCaseMock = { execute: jest.fn() };

    (container.get as jest.Mock).mockImplementation((type: any) => {
      switch (type) {
        case TYPES.GetDiscountsListUseCase:
          return getDiscountsListUseCaseMock;
        case TYPES.RegisterDiscountUseCase:
          return registerDiscountUseCaseMock;
        case TYPES.GetMembershipListUseCase:
          return getMembershipListUseCaseMock;
        case TYPES.GetDiscountByIdUseCase:
          return getDiscountByIdUseCaseMock;
        case TYPES.EditDiscountUseCase:
          return editDiscountUseCaseMock;
        case TYPES.DeleteDiscountUseCase:
          return deleteDiscountUseCaseMock;
        default:
          return null;
      }
    });

    (useSession as jest.Mock).mockReturnValue({ data: sessionMock });

    getMembershipListUseCaseMock.execute.mockResolvedValue({
      totalRecords: 0,
      items: [],
    });

    getDiscountsListUseCaseMock.execute.mockResolvedValue({
      totalRecords: 0,
      items: [],
    });
  });

  it("should initialize state correctly", () => {
    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(result.current.discount).toEqual({
        discountId: 0,
        discountPercentage: 0,
        startDate: "",
        endDate: "",
        idMembership: 0,
        comments: "",
      });
      expect(result.current.discountError).toEqual({
        discountPercentageError: false,
        startDateError: false,
        endDateError: false,
        idMembershipError: false,
        commentsError: false,
      });
      expect(result.current.isModalOpen).toEqual({
        createModal: false,
        detailsModal: false,
        deleteModal: false,
        editModal: false,
      });
    });
  });

  it("should fetch membership and discount lists on gym ID change", async () => {
    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(getMembershipListUseCaseMock.execute).toHaveBeenCalled();
      expect(getDiscountsListUseCaseMock.execute).toHaveBeenCalled();
    });
  });

  it("should set validation errors when form is invalid", async () => {
    (isNotEmpty as jest.Mock).mockReturnValue(false);
    (isValidNumber as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.discountError.discountPercentageError).toBe(true);
    expect(result.current.discountError.startDateError).toBe(true);
    expect(result.current.discountError.endDateError).toBe(true);
    expect(result.current.discountError.idMembershipError).toBe(true);
    expect(result.current.discountError.commentsError).toBe(true);
  });

  it("should register correctly", async () => {
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    (isValidNumber as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => ViewModel());
    act(() => {
      result.current.handleSetDiscountPercentage("10");
      result.current.handleSetStartDate("2023-01-01");
      result.current.handleSetEndDate("2023-12-31");
      result.current.handleSetIdMembership("1");
      result.current.handleSetComments("Test comment");
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(registerDiscountUseCaseMock.execute).toHaveBeenCalled();
    expect(result.current.discountError.discountPercentageError).toBe(false);
    expect(result.current.discountError.startDateError).toBe(false);
    expect(result.current.discountError.endDateError).toBe(false);
    expect(result.current.discountError.idMembershipError).toBe(false);
    expect(result.current.discountError.commentsError).toBe(false);
  });

  it("handleOpenModal should fetch discount by ID for edit and view modes", async () => {
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    (isValidNumber as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => ViewModel());
    await act(async () => {
      await result.current.handleOpenModal("editModal", 1);
    });

    expect(getDiscountByIdUseCaseMock.execute).toHaveBeenCalledWith(1);
    expect(result.current.modalMode).toBe("edit");
  });

  it("deleteDiscount should call deleteDiscountUseCase and refresh list", async () => {
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    (isValidNumber as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => ViewModel());
    await act(async () => {
      await result.current.deleteDiscount(1);
    });

    expect(deleteDiscountUseCaseMock.execute).toHaveBeenCalledWith(1);
    expect(getDiscountsListUseCaseMock.execute).toHaveBeenCalled();
  });

  it("should handle form submission when RegisterDiscountUseCase returns false", async () => {
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    (isValidNumber as jest.Mock).mockReturnValue(true);
    registerDiscountUseCaseMock.execute.mockResolvedValue(false);

    const { result } = renderHook(() => ViewModel());
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(registerDiscountUseCaseMock.execute).toHaveBeenCalled();
    expect(result.current.error).toBe("Error registering discount");
  });

  it("should handle form submission when idGym is 0", async () => {
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    (isValidNumber as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => ViewModel());
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.error).toBe("Error registering discount");
  });

  it("should handle form submission when errors are present", async () => {
    (isNotEmpty as jest.Mock).mockReturnValue(true);
    (isValidNumber as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => ViewModel());
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    result.current.discountError = {
      discountPercentageError: true,
      startDateError: true,
      endDateError: true,
      idMembershipError: true,
      commentsError: true,
    };

    expect(result.current.error).toBe("Error registering discount");
  });

  it("sould show error when fetching membership list fails", async () => {
    getMembershipListUseCaseMock.execute.mockRejectedValue({
      response: { data: { message: "Error fetching membership" } },
    });

    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(result.current.error).toBe("Error fetching membership");
    });
  });

  it("should show error when fetching discount list fails", async () => {
    getDiscountsListUseCaseMock.execute.mockRejectedValue({
      response: { data: { message: "Error fetching discounts" } },
    });

    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(result.current.error).toBe("Error fetching discounts");
    });
  });

  it("should show error when fetching discount list is false", async () => {
    getDiscountsListUseCaseMock.execute.mockRejectedValue(false);

    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(result.current.error).toBe("Error fetching discount");
    });
  });
});
