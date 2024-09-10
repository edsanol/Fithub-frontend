import { TYPES } from "@/config/types";
import { DiscountsService } from "@/domain/services/discountsService";
import { HttpClient } from "@/infrastructure/api/http";
import { Container } from "inversify";
import "reflect-metadata";
import { DiscountsServiceImpl } from "../discountsService";
import { Discounts } from "@/domain/entities/Discounts";
import { PaginateData } from "@/domain/models/PaginateData";

const mockHttpClient = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
};

describe("DiscountsServiceImpl", () => {
  let discountsService: DiscountsService;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<HttpClient>(TYPES.HttpClient)
      .toConstantValue(mockHttpClient as unknown as HttpClient);
    container
      .bind<DiscountsService>(TYPES.DiscountsService)
      .to(DiscountsServiceImpl);

    discountsService = container.get<DiscountsService>(TYPES.DiscountsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register discount and return true on success", async () => {
    const mockDiscount: Discounts = {
      discountId: 1,
      discountPercentage: 10,
      startDate: "2021-01-01",
      endDate: "2021-01-10",
      idMembership: 1,
      comments: "Test discount",
    };

    mockHttpClient.post.mockResolvedValue({ data: true });

    const result = await discountsService.registerDiscount(mockDiscount);

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Discounts/Register",
      mockDiscount
    );
    expect(result).toBe(true);
  });

  it("should fetch discounts list and return PaginateResponseList", async () => {
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

    mockHttpClient.post.mockResolvedValue({ data: mockPaginateResponseList });

    const result = await discountsService.getDiscountsList(mockPaginateData);

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      "/Discounts",
      mockPaginateData
    );
    expect(result).toEqual(mockPaginateResponseList);
  });

  it("should fetch discount by id and return Discounts", async () => {
    const mockDiscount: Discounts = {
      discountId: 1,
      discountPercentage: 10,
      startDate: "2021-01-01",
      endDate: "2021-01-10",
      idMembership: 1,
      comments: "Test discount",
    };

    mockHttpClient.get.mockResolvedValue({ data: mockDiscount });

    const result = await discountsService.getDiscountById(1);

    expect(mockHttpClient.get).toHaveBeenCalledWith("/Discounts/1");
    expect(result).toEqual(mockDiscount);
  });

  it("should edit discount and return true on success", async () => {
    const mockDiscount: Discounts = {
      discountId: 1,
      discountPercentage: 20,
      startDate: "2021-01-01",
      endDate: "2021-01-10",
      idMembership: 1,
      comments: "Updated discount",
    };

    mockHttpClient.put.mockResolvedValue({ data: true });

    const result = await discountsService.editDiscount(1, mockDiscount);

    expect(mockHttpClient.put).toHaveBeenCalledWith(
      "/Discounts/Edit/1",
      mockDiscount
    );
    expect(result).toBe(true);
  });

  it("should delete discount and return true on success", async () => {
    mockHttpClient.put.mockResolvedValue({ data: true });

    const result = await discountsService.deleteDiscount(1);

    expect(mockHttpClient.put).toHaveBeenCalledWith(
      "/Discounts/Delete/1",
      null
    );
    expect(result).toBe(true);
  });
});
