import { MembershipService } from "@/domain/services/membershipService";
import { injectable, inject } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { Membership } from "@/domain/entities/Membership";
import { TickerResponseApi } from "../api/model/TickerResponseApi";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";

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

  async getMembershipList(
    data: PaginateData
  ): Promise<PaginateResponseList<Membership>> {
    const response = await this.http.post<
      TickerResponseApi<PaginateResponseList<Membership>>,
      PaginateData
    >("/Membership", data);

    return response.data;
  }

  async getMembershipById(id: number): Promise<Membership> {
    const response = await this.http.get<TickerResponseApi<Membership>>(
      `/Membership/${id}`
    );

    return response.data;
  }

  async editMembership(id: number, membership: Membership): Promise<boolean> {
    const response = await this.http.put<
      TickerResponseApi<boolean>,
      Membership
    >(`/Membership/Edit/${id}`, membership);

    return response.data;
  }

  async deleteMembership(id: number): Promise<boolean> {
    const response = await this.http.delete<TickerResponseApi<boolean>>(
      `/Membership/Delete/${id}`
    );

    return response.data;
  }
}
