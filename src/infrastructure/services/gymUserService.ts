import { GymUser } from "@/domain/entities/GymUser";
import { GymUserService } from "@/domain/services/gymUserService";
import { inject, injectable } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { TickerResponseApi } from "../api/model/TickerResponseApi";
import { UserLogin } from "@/domain/entities/UserLogin";
import { ResetPassword } from "@/domain/models/ResetPassword";

@injectable()
export class GymUserServiceImpl implements GymUserService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }

  async loginGymUser(userLogin: UserLogin): Promise<GymUser> {
    const response = await this.http.post<
      TickerResponseApi<GymUser>,
      UserLogin
    >("/Gym/Login", {
      email: userLogin.email,
      password: userLogin.password,
    });

    return response.data;
  }

  async registerGymUser(gymUser: GymUser): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, GymUser>(
      "/Gym/Register",
      gymUser
    );

    return response.data;
  }

  async editGymUser(id: number, gymUser: GymUser): Promise<boolean> {
    const response = await this.http.put<TickerResponseApi<boolean>, GymUser>(
      `/Gym/Edit/${id}`,
      gymUser
    );

    return response.data;
  }

  async getGymUserById(id: number): Promise<GymUser> {
    const response = await this.http.get<TickerResponseApi<GymUser>>(
      `/Gym/${id}`
    );

    return response.data;
  }

  async changePassword(data: ResetPassword): Promise<boolean> {
    const response = await this.http.post<
      TickerResponseApi<boolean>,
      ResetPassword
    >("/Gym/ChangePassword", data);

    return response.data;
  }
}
