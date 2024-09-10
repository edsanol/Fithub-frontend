import { TYPES } from "@/config/types";
import { DiscountsRepository } from "@/domain/repositories/discountsRepository";
import { DiscountsService } from "@/domain/services/discountsService";
import { Container } from "inversify";
import "reflect-metadata";
import { DiscountsRepositoryImpl } from "../discountsRepository";
import { Discounts } from "@/domain/entities/Discounts";
import { PaginateData } from "@/domain/models/PaginateData";

const mockDiscountsService = {
  registerDiscount: jest.fn(),
  getDiscountsList: jest.fn(),
  getDiscountById: jest.fn(),
  editDiscount: jest.fn(),
  deleteDiscount: jest.fn(),
};

describe("DiscountsRepositoryImpl", () => {
  let discountsRepository: DiscountsRepository;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<DiscountsService>(TYPES.DiscountsService)
      .toConstantValue(mockDiscountsService as unknown as DiscountsService);
    container
      .bind<DiscountsRepository>(TYPES.DiscountsRepository)
      .to(DiscountsRepositoryImpl);

    discountsRepository = container.get<DiscountsRepository>(
      TYPES.DiscountsRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call registerDiscount in DiscountsService", async () => {
    const mockDiscount: Discounts = {
      discountId: 1,
      discountPercentage: 10,
      startDate: "2021-01-01",
      endDate: "2021-01-10",
      idMembership: 1,
      comments: "Test discount",
    };

    mockDiscountsService.registerDiscount.mockResolvedValue(true);

    const result = await discountsRepository.registerDiscount(mockDiscount);

    expect(mockDiscountsService.registerDiscount).toHaveBeenCalledWith(
      mockDiscount
    );
    expect(result).toBe(true);
  });

  it("should call getDiscountsList in DiscountsService", async () => {
    const mockPaginateData: PaginateData = {
      numPage: 1,
      numRecordsPage: 10,
    };

    const mockPaginateResponseList = {
      data: [
        {
          discountId: 1,
          discountPercentage: 10,
          startDate: "2021-01-01",
          endDate: "2021-01-10",
          idMembership: 1,
          comments: "Test discount",
        },
      ],
      totalRecords: 1,
    };

    mockDiscountsService.getDiscountsList.mockResolvedValue(
      mockPaginateResponseList
    );

    const result = await discountsRepository.getDiscountsList(mockPaginateData);

    expect(mockDiscountsService.getDiscountsList).toHaveBeenCalledWith(
      mockPaginateData
    );
    expect(result).toEqual(mockPaginateResponseList);
  });

  it("should call getDiscountById in DiscountsService", async () => {
    const mockDiscount: Discounts = {
      discountId: 1,
      discountPercentage: 10,
      startDate: "2021-01-01",
      endDate: "2021-01-10",
      idMembership: 1,
      comments: "Test discount",
    };

    mockDiscountsService.getDiscountById.mockResolvedValue(mockDiscount);

    const result = await discountsRepository.getDiscountById(1);

    expect(mockDiscountsService.getDiscountById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockDiscount);
  });

  it("should call editDiscount in DiscountsService", async () => {
    const mockDiscount: Discounts = {
      discountId: 1,
      discountPercentage: 20,
      startDate: "2021-01-01",
      endDate: "2021-01-10",
      idMembership: 1,
      comments: "Updated discount",
    };

    mockDiscountsService.editDiscount.mockResolvedValue(true);

    const result = await discountsRepository.editDiscount(1, mockDiscount);

    expect(mockDiscountsService.editDiscount).toHaveBeenCalledWith(
      1,
      mockDiscount
    );
    expect(result).toBe(true);
  });

  it("should call deleteDiscount in DiscountsService", async () => {
    mockDiscountsService.deleteDiscount.mockResolvedValue(true);

    const result = await discountsRepository.deleteDiscount(1);

    expect(mockDiscountsService.deleteDiscount).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });
});
