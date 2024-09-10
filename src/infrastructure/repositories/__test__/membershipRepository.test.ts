import "reflect-metadata";
import { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { MembershipService } from "@/domain/services/membershipService";
import { Container } from "inversify";
import { MembershipRepositoryImpl } from "../membershipRepository";
import { TYPES } from "@/config/types";
import { Membership } from "@/domain/entities/Membership";
import { PaginateData } from "@/domain/models/PaginateData";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";

const mockMembershipService = {
  registerMembership: jest.fn(),
  getMembershipList: jest.fn(),
  getMembershipById: jest.fn(),
  editMembership: jest.fn(),
  deleteMembership: jest.fn(),
  getMembershipByGymId: jest.fn(),
};

describe("MembershipRepositoryImpl", () => {
  let membershipRepository: MembershipRepository;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<MembershipService>(TYPES.MembershipService)
      .toConstantValue(mockMembershipService as unknown as MembershipService);
    container
      .bind<MembershipRepository>(TYPES.MembershipRepository)
      .to(MembershipRepositoryImpl);

    membershipRepository = container.get<MembershipRepository>(
      TYPES.MembershipRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call registerMembership in MembershipService", async () => {
    const mockMembership: Membership = {
      membershipID: 1,
      membershipName: "test membership",
      cost: 100,
      durationInDays: 30,
      description: "test description",
    };

    mockMembershipService.registerMembership.mockResolvedValue(true);

    const result = await membershipRepository.registerMembership(
      mockMembership
    );

    expect(mockMembershipService.registerMembership).toHaveBeenCalledWith(
      mockMembership
    );
    expect(result).toBe(true);
  });

  it("should call getMembershipList in MembershipService", async () => {
    const mockPaginateData: PaginateData = {
      numPage: 1,
      numRecordsPage: 10,
    };

    const mockPaginateResponseList = {
      data: [
        {
          membershipId: 1,
          membershipName: "Basic",
          description: "Basic Membership",
          price: 100,
          duration: 30,
        },
      ],
      totalRecords: 1,
    };

    mockMembershipService.getMembershipList.mockResolvedValue(
      mockPaginateResponseList
    );

    const result = await membershipRepository.getMembershipList(
      mockPaginateData
    );

    expect(mockMembershipService.getMembershipList).toHaveBeenCalledWith(
      mockPaginateData
    );
    expect(result).toEqual(mockPaginateResponseList);
  });

  it("should call getMembershipById in MembershipService", async () => {
    const mockMembership: Membership = {
      membershipID: 1,
      membershipName: "test membership",
      cost: 100,
      durationInDays: 30,
      description: "test description",
    };

    mockMembershipService.getMembershipById.mockResolvedValue(mockMembership);

    const result = await membershipRepository.getMembershipById(1);

    expect(mockMembershipService.getMembershipById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockMembership);
  });

  it("should call editMembership in MembershipService", async () => {
    const mockMembership: Membership = {
      membershipID: 1,
      membershipName: "test membership",
      cost: 100,
      durationInDays: 30,
      description: "test description",
    };

    mockMembershipService.editMembership.mockResolvedValue(true);

    const result = await membershipRepository.editMembership(1, mockMembership);

    expect(mockMembershipService.editMembership).toHaveBeenCalledWith(
      1,
      mockMembership
    );
    expect(result).toBe(true);
  });

  it("should call deleteMembership in MembershipService", async () => {
    mockMembershipService.deleteMembership.mockResolvedValue(true);

    const result = await membershipRepository.deleteMembership(1);

    expect(mockMembershipService.deleteMembership).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });

  it("should call getMembershipByGymId in MembershipService", async () => {
    const mockMembershipByGymId: MembershipByGymId[] = [
      {
        membershipID: 1,
        membershipName: "Basic",
        gymID: 1,
      },
    ];

    mockMembershipService.getMembershipByGymId.mockResolvedValue(
      mockMembershipByGymId
    );

    const result = await membershipRepository.getMembershipByGymId();

    expect(mockMembershipService.getMembershipByGymId).toHaveBeenCalled();
    expect(result).toEqual(mockMembershipByGymId);
  });
});
