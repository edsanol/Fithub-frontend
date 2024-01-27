import { AthleteUser } from "@/domain/entities/AthleteUser";
import { PaginateData } from "@/domain/models/PaginateData";
import { AthleteUserService } from "@/domain/services/athleteUserService";
import { inject, injectable } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { TickerResponseApi } from "../api/model/TickerResponseApi";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { UpdateMembershipToAthlete } from "@/domain/models/UpdateMembershipToAthlete";

@injectable()
export class AthleteUserServiceImpl implements AthleteUserService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }

  async registerAthleteUser(athleteUser: AthleteUser): Promise<boolean> {
    const response = await this.http.post<
      TickerResponseApi<boolean>,
      AthleteUser
    >("/Athlete/Register", athleteUser);

    return response.data;
  }

  async getAthleteUserList(
    data: PaginateData
  ): Promise<PaginateResponseList<AthleteUser>> {
    const response = await this.http.post<
      TickerResponseApi<PaginateResponseList<AthleteUser>>,
      PaginateData
    >("/Athlete/List", data);

    return response.data;
  }

  async getAthleteUserById(id: number): Promise<AthleteUser> {
    const response = await this.http.get<TickerResponseApi<AthleteUser>>(
      `/Athlete/${id}`
    );

    return response.data;
  }

  async editAthleteUser(
    id: number,
    athleteUser: AthleteUser
  ): Promise<boolean> {
    const response = await this.http.put<
      TickerResponseApi<boolean>,
      AthleteUser
    >(`/Athlete/Edit/${id}`, athleteUser);

    return response.data;
  }

  async deleteAthleteUser(id: number): Promise<boolean> {
    const response = await this.http.put<TickerResponseApi<boolean>, null>(
      `/Athlete/Delete/${id}`,
      null
    );

    return response.data;
  }

  async updateMembershipToAthlete(
    data: UpdateMembershipToAthlete
  ): Promise<boolean> {
    const response = await this.http.post<
      TickerResponseApi<boolean>,
      UpdateMembershipToAthlete
    >("/Athlete/UpdateMembershipToAthlete", {
      athleteId: data.athleteId,
      membershipId: data.membershipId,
    });

    return response.data;
  }
}
