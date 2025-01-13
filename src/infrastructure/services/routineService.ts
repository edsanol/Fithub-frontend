import { RoutineService } from "@/domain/services/routineService";
import { inject, injectable } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { Routine } from "@/domain/entities/Routine";
import { TickerResponseApi } from "../api/model/TickerResponseApi";

@injectable()
export class RoutineServiceImpl implements RoutineService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }

  async createRoutine(routine: Routine): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, Routine>("/Routine/CreateRoutine", routine);

    return response.data;
  }
}
