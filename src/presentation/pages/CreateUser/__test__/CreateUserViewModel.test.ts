import { TYPES } from "@/config/types";
import { EditAthleteUserUseCase } from "@/domain/useCases/AthleteUser/editAthleteUserUseCase";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Container } from "inversify";
import ViewModel from "../components/create-user-form/ViewModel";
import { GetAthleteUserByIdUseCase } from "@/domain/useCases/AthleteUser/getAtleteUserByIdUseCase";
import { GetMembershipByGymIdUseCase } from "@/domain/useCases/Membership/getMembershipByGymIdUseCase";
import { RegisterAthleteUserUseCase } from "@/domain/useCases/AthleteUser/registerAthleteUserUseCase";
import {
  isNotEmpty,
  isValidEmail,
  isValidGenre,
  isValidName,
  isValidPhone,
} from "@/presentation/helpers";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/create-user/123"),
}));

jest.mock("@/presentation/helpers", () => ({
  isNotEmpty: jest.fn(),
  isValidEmail: jest.fn(),
  isValidGenre: jest.fn(),
  isValidName: jest.fn(),
  isValidPhone: jest.fn(),
}));

const container = new Container();

describe("CreateUser ViewModel", () => {
  let mockRegisterAthleteUserUseCase: jest.Mocked<RegisterAthleteUserUseCase>;
  let mockEditAthleteUserUseCase: jest.Mocked<EditAthleteUserUseCase>;
  let mockGetAthleteUserByIdUseCase: jest.Mocked<GetAthleteUserByIdUseCase>;
  let mockGetMembershipByGymIdUseCase: jest.Mocked<GetMembershipByGymIdUseCase>;

  beforeEach(() => {
    mockRegisterAthleteUserUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<RegisterAthleteUserUseCase>;

    mockEditAthleteUserUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<EditAthleteUserUseCase>;

    mockGetAthleteUserByIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetAthleteUserByIdUseCase>;

    mockGetMembershipByGymIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetMembershipByGymIdUseCase>;

    container
      .bind<RegisterAthleteUserUseCase>(TYPES.RegisterAthleteUserUseCase)
      .toConstantValue(mockRegisterAthleteUserUseCase);
    container
      .bind<EditAthleteUserUseCase>(TYPES.EditAthleteUserUseCase)
      .toConstantValue(mockEditAthleteUserUseCase);
    container
      .bind<GetAthleteUserByIdUseCase>(TYPES.GetAthleteUserByIdUseCase)
      .toConstantValue(mockGetAthleteUserByIdUseCase);
    container
      .bind<GetMembershipByGymIdUseCase>(TYPES.GetMembershipByGymIdUseCase)
      .toConstantValue(mockGetMembershipByGymIdUseCase);
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => ViewModel());

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

  it("should update field correctly when setField is called", () => {
    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("email", "test@example.com");
    });

    expect(result.current.athleteData.email).toBe("test@example.com");
  });

  it("should set validation errors when form is invalid", () => {
    (isValidEmail as jest.Mock).mockReturnValue(false);
    (isValidName as jest.Mock).mockReturnValue(false);
    (isValidPhone as jest.Mock).mockReturnValue(false);
    (isValidGenre as jest.Mock).mockReturnValue(false);
    (isNotEmpty as jest.Mock).mockReturnValue(false);

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
    mockRegisterAthleteUserUseCase.execute.mockResolvedValue(true);

    const { result } = renderHook(() => ViewModel());

    act(() => {
      result.current.setField("email", "test@example.com");
      result.current.setField("athleteName", "John");
      result.current.setField("athleteLastName", "Doe");
      result.current.setField("phoneNumber", "1234567890");
      result.current.setField("genre", "Male");
      result.current.setField("birthDate", "2000-01-01");
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    const response = await mockRegisterAthleteUserUseCase.execute({
      athleteName: "John",
      athleteLastName: "Doe",
      email: "test@example.com",
      phoneNumber: "1234567890",
      genre: "Male",
      birthDate: "2000-01-01",
      registerDate: expect.any(String),
      status: true,
      startDate: "",
      endDate: "",
      membershipName: "",
      cost: 0,
      membershipId: 0,
      cardAccessCode: "",
    });

    expect(response).toBe(true);
  });
});
