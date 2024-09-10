import { TYPES } from "@/config/types";
import { MembershipService } from "@/domain/services/membershipService";
import { HttpClient } from "@/infrastructure/api/http";
import { Container } from "inversify";
import "reflect-metadata";
import { MembershipServiceImpl } from "../membershipService";
import { Membership } from "@/domain/entities/Membership";
import { PaginateData } from "@/domain/models/PaginateData";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";

const mockHttpClient = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
};

describe("MembershipServiceImpl", () => {
  let membershipService: MembershipService;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<HttpClient>(TYPES.HttpClient)
      .toConstantValue(mockHttpClient as unknown as HttpClient);
    container
      .bind<MembershipService>(TYPES.MembershipService)
      .to(MembershipServiceImpl);

    membershipService = container.get<MembershipService>(
      TYPES.MembershipService
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register membership and return true on success", async () => {
    const mockMembership: Membership = {
      membershipID: 1,
      membershipName: "test membership",
      cost: 100,
      durationInDays: 30,
      description: "test description",
      idGym: 1,
      status: true,
    };

    mockHttpClient.post.mockResolvedValue({ data: true });

    const result = await membershipService.registerMembership(mockMembership);

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Membership/Register",
      mockMembership
    );
    expect(result).toBe(true);
  });

  it("should fetch membership list and return PaginateResponseList", async () => {
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

    mockHttpClient.post.mockResolvedValue({ data: mockPaginateResponseList });

    const result = await membershipService.getMembershipList(mockPaginateData);

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Membership",
      mockPaginateData
    );
    expect(result).toEqual(mockPaginateResponseList);
  });

  it("should fetch membership by id and return Membership", async () => {
    const mockMembership: Membership = {
      membershipID: 1,
      membershipName: "test membership",
      cost: 100,
      durationInDays: 30,
      description: "test description",
      idGym: 1,
      status: true,
    };

    mockHttpClient.get.mockResolvedValue({ data: mockMembership });

    const result = await membershipService.getMembershipById(1);

    expect(mockHttpClient.get).toHaveBeenCalledWith("/Membership/1");
    expect(result).toEqual(mockMembership);
  });

  it("should edit membership and return true on success", async () => {
    const mockMembership: Membership = {
      membershipID: 1,
      membershipName: "test membership",
      cost: 100,
      durationInDays: 30,
      description: "test description",
      idGym: 1,
      status: true,
    };

    mockHttpClient.put.mockResolvedValue({ data: true });

    const result = await membershipService.editMembership(1, mockMembership);

    expect(mockHttpClient.put).toHaveBeenCalledWith(
      "/Membership/Edit/1",
      mockMembership
    );
    expect(result).toBe(true);
  });

  it("should delete membership and return true on success", async () => {
    mockHttpClient.put.mockResolvedValue({ data: true });

    const result = await membershipService.deleteMembership(1);

    expect(mockHttpClient.put).toHaveBeenCalledWith(
      "/Membership/Delete/1",
      null
    );
    expect(result).toBe(true);
  });

  it("should fetch membership by gym id and return MembershipByGymId array", async () => {
    const mockMembershipByGymId: MembershipByGymId[] = [
      {
        membershipID: 1,
        membershipName: "test membership",
        gymID: 1,
      },
    ];

    mockHttpClient.get.mockResolvedValue({ data: mockMembershipByGymId });

    const result = await membershipService.getMembershipByGymId();

    expect(mockHttpClient.get).toHaveBeenCalledWith("/Membership/Select");
    expect(result).toEqual(mockMembershipByGymId);
  });
});
