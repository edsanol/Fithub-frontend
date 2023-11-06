import { GymUser } from "@/domain/entities/GymUser";
import { GymUserService } from "@/domain/services/gymUserService";
import { inject, injectable } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { TickerResponseApi } from "../api/model/TickerResponseApi";

@injectable()
export class GymUserServiceImpl implements GymUserService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }

  async registerGymUser(gymUser: GymUser): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, GymUser>(
      "/Gym/Register",
      gymUser
    );

    return response.data;
  }
}
