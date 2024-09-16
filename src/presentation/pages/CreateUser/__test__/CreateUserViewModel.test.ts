import { TYPES } from "@/config/types";
import { act, renderHook, waitFor } from "@testing-library/react";
import ViewModel from "../components/create-user-form/ViewModel";
import {
  isNotEmpty,
  isValidEmail,
  isValidGenre,
  isValidName,
  isValidPhone,
} from "@/presentation/helpers";
import container from "@/config/inversifyContainer";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => "/create-user/123"),
}));

jest.mock("@/presentation/helpers", () => ({
  isNotEmpty: jest.fn(),
  isValidEmail: jest.fn(),
  isValidGenre: jest.fn(),
  isValidName: jest.fn(),
  isValidPhone: jest.fn(),
}));

// Mock the use cases
jest.mock("@/domain/useCases/AthleteUser/getAtleteUserByIdUseCase");
jest.mock("@/domain/useCases/Membership/getMembershipByGymIdUseCase");
jest.mock("@/domain/useCases/AthleteUser/registerAthleteUserUseCase");
jest.mock("@/domain/useCases/AthleteUser/editAthleteUserUseCase");

jest.mock("@/config/inversifyContainer", () => ({
  get: jest.fn(),
}));

const mockMembershipData: MembershipByGymId[] = [
  { membershipID: 1, membershipName: "Membership 1", gymID: 1 },
  { membershipID: 2, membershipName: "Membership 2", gymID: 1 },
];

const setupMocksForValidation = (valid = true) => {
  (isValidEmail as jest.Mock).mockReturnValue(valid);
  (isValidName as jest.Mock).mockReturnValue(valid);
  (isValidPhone as jest.Mock).mockReturnValue(valid);
  (isValidGenre as jest.Mock).mockReturnValue(valid);
  (isNotEmpty as jest.Mock).mockReturnValue(valid);
};

describe("CreateUser ViewModel", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const getMembershipByGymIdUseCase = {
      execute: jest.fn().mockResolvedValue(mockMembershipData),
    };
    (container.get as jest.Mock).mockReturnValue(getMembershipByGymIdUseCase);
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(result.current.athleteData).toEqual({
        athleteName: "",
        athleteLastName: "",
        email: "",
        phoneNumber: "",
        genre: "",
        birthDate: "",
        registerDate: expect.any(String),
        status: true,
        startDate: "",
        endDate: "",
        membershipName: "",
        cost: 0,
        membershipId: 0,
        cardAccessCode: "",
      });

      expect(result.current.athleteDataError).toEqual({
        nameError: false,
        lastNameError: false,
        emailError: false,
        phoneNumberError: false,
        genreError: false,
        birthDateError: false,
      });
    });
  });

  it("should update field correctly when setField is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("email", "test@example.com");
    });

    expect(result.current.athleteData.email).toBe("test@example.com");
  });

  it("should set validation errors when form is invalid", () => {
    setupMocksForValidation(false);

    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.athleteDataError.emailError).toBe(true);
    expect(result.current.athleteDataError.nameError).toBe(true);
    expect(result.current.athleteDataError.lastNameError).toBe(true);
    expect(result.current.athleteDataError.phoneNumberError).toBe(true);
    expect(result.current.athleteDataError.genreError).toBe(true);
    expect(result.current.athleteDataError.birthDateError).toBe(true);
  });

  it("should call RegisterAthleteUserUseCase when form is valid and athleteIdValue is null", async () => {
    setupMocksForValidation();
    const registerAthleteUserUseCase = {
      execute: jest.fn().mockResolvedValue(true),
    };
    (container.get as jest.Mock).mockReturnValue(registerAthleteUserUseCase);

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(registerAthleteUserUseCase.execute).toHaveBeenCalled();
  });

  it("should handle form submission when RegisterAthleteUserUseCase returns false", async () => {
    setupMocksForValidation();
    const registerAthleteUserUseCase = {
      execute: jest.fn().mockResolvedValue(false),
    };
    (container.get as jest.Mock).mockReturnValue(registerAthleteUserUseCase);

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(registerAthleteUserUseCase.execute).toHaveBeenCalled();
    expect(result.current.error).toBe("Error");
  });

  it("handles errors on fetch failure", async () => {
    setupMocksForValidation();
    const getMembershipByGymIdUseCase = {
      execute: jest
        .fn()
        .mockRejectedValue({
          response: { data: { message: "Error fetching membership" } },
        }),
    };
    (container.get as jest.Mock).mockReturnValue(getMembershipByGymIdUseCase);

    const { result } = renderHook(() => ViewModel());

    waitFor(() => {
      expect(result.current.errorModal).toBe(true);
      expect(result.current.errorMessage).toBe("Error fetching membership");
    });
  });
});
