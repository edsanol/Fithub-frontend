import { DiscountsService } from "@/domain/services/discountsService";
import type { HttpClient } from "../api/http";
import { injectable, inject } from "inversify";
import { TYPES } from "@/config/types";
import { Discounts } from "@/domain/entities/Discounts";
import { TickerResponseApi } from "../api/model/TickerResponseApi";

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
}
