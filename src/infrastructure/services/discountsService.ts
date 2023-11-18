import { DiscountsService } from "@/domain/services/discountsService";
import type { HttpClient } from "../api/http";
import { injectable, inject } from "inversify";
import { TYPES } from "@/config/types";
import { Discounts } from "@/domain/entities/Discounts";
import { TickerResponseApi } from "../api/model/TickerResponseApi";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";

@injectable()
export class DiscountsServiceImpl implements DiscountsService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }

  async registerDiscount(discount: Discounts): Promise<boolean> {
    const response = await this.http.post<
      TickerResponseApi<boolean>,
      Discounts
    >("/Discounts/Register", discount);

    return response.data;
  }

  async getDiscountsList(
    data: PaginateData
  ): Promise<PaginateResponseList<Discounts>> {
    const response = await this.http.post<
      TickerResponseApi<PaginateResponseList<Discounts>>,
      PaginateData
    >("/Discounts", data);

    return response.data;
  }

  async getDiscountById(id: number): Promise<Discounts> {
    const response = await this.http.get<TickerResponseApi<Discounts>>(
      `/Discounts/${id}`
    );

    return response.data;
  }

  async editDiscount(id: number, discount: Discounts): Promise<boolean> {
    const response = await this.http.put<TickerResponseApi<boolean>, Discounts>(
      `/Discounts/Edit/${id}`,
      discount
    );

    return response.data;
  }

  async deleteDiscount(id: number): Promise<boolean> {
    const response = await this.http.put<TickerResponseApi<boolean>, null>(
      `/Discounts/Delete/${id}`,
      null
    );

    return response.data;
  }
}
