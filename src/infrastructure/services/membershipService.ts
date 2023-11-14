import { MembershipService } from "@/domain/services/membershipService";
import { injectable, inject } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { Membership } from "@/domain/entities/Membership";
import { TickerResponseApi } from "../api/model/TickerResponseApi";

@injectable()
export class MembershipServiceImpl implements MembershipService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }

  async registerMembership(membership: Membership): Promise<boolean> {
    const response = await this.http.post<
      TickerResponseApi<boolean>,
      Membership
    >("/Membership/Register", membership);

    return response.data;
  }
}
