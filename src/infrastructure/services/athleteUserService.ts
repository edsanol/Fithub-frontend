import { AthleteUser } from "@/domain/entities/AthleteUser";
import { AthleteUserList } from "@/domain/models/AthleteUserList";
import { AthleteUserService } from "@/domain/services/athleteUserService";
import { inject, injectable } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { TickerResponseApi } from "../api/model/TickerResponseApi";

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

  async getAthleteUserList(data: AthleteUserList): Promise<AthleteUser[]> {
    const response = await this.http.post<
      TickerResponseApi<AthleteUser[]>,
      AthleteUserList
    >("/Athlete/List", data);

    return response.data;
  }
}
