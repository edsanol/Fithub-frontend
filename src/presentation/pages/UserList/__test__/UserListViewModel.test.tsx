import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { act, renderHook } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ViewModel from "../ViewModel";

jest.mock("@/config/inversifyContainer");
jest.mock("next-auth/react");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ViewModel tests", () => {
  let mockGetAthleteUserListUseCase: jest.Mock;
  let mockUpdateMembershipToAthleteUseCase: jest.Mock;
  let mockGetAthleteUserByIdUseCase: jest.Mock;
  let mockDeleteAthleteUserUseCase: jest.Mock;
  let mockGetMembershipByGymIdUseCase: jest.Mock;
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    // Mock de la sesión
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { gymId: 1 } },
    });
  
    // Mock de router
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  
    // Mock de casos de uso
    mockGetAthleteUserListUseCase = jest.fn(() => ({
      execute: jest.fn().mockResolvedValue({
        totalRecords: 2,
        items: [{ athleteId: 1, athleteName: "John" }],
      }),
    }));
  
    mockUpdateMembershipToAthleteUseCase = jest.fn(() => ({
      execute: jest.fn().mockResolvedValue(true),
    }));
  
    mockGetAthleteUserByIdUseCase = jest.fn(() => ({
      execute: jest.fn().mockResolvedValue({
        athleteId: 1,
        athleteName: "John",
        athleteLastName: "Doe",
      }),
    }));
  
    mockDeleteAthleteUserUseCase = jest.fn(() => ({
      execute: jest.fn().mockResolvedValue(true),
    }));
  
    mockGetMembershipByGymIdUseCase = jest.fn(() => ({
      execute: jest.fn().mockResolvedValue([
        { membershipId: 1, membershipName: "Basic" },
      ]),
    }));
  
    // Configurar mocks en container
    (container.get as jest.Mock).mockImplementation((type) => {
      switch (type) {
        case TYPES.GetAthleteUserListUseCase:
          return mockGetAthleteUserListUseCase();
        case TYPES.UpdateMembershipToAthleteUseCase:
          return mockUpdateMembershipToAthleteUseCase();
        case TYPES.GetAthleteUserByIdUseCase:
          return mockGetAthleteUserByIdUseCase();
        case TYPES.DeleteAthleteUserUseCase:
          return mockDeleteAthleteUserUseCase();
        case TYPES.GetMembershipByGymIdUseCase:
          return mockGetMembershipByGymIdUseCase();
        default:
          return null;
      }
    });
  });

  it("should set athlete user details on getAthleteUserById", async () => {
    mockGetAthleteUserByIdUseCase.mockResolvedValue({
      athleteId: 1,
      athleteName: "John",
      athleteLastName: "Doe",
    });

    const { result } = renderHook(() => ViewModel());

    await act(async () => {
      await result.current.handleOpenModal(1, "detailsModal");
    });

    expect(mockGetAthleteUserByIdUseCase).toHaveBeenCalledWith(1);
    expect(result.current.athleteUser.athleteName).toBe("John");
  });
});
