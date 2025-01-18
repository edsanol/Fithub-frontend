import { RoutineService } from "@/domain/services/routineService";
import { inject, injectable } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { Routine } from "@/domain/entities/Routine";
import { TickerResponseApi } from "../api/model/TickerResponseApi";
import { Exercise } from "@/domain/entities/Exercise";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { SendRoutine } from "@/domain/models/SendRoutine";

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

  async createExercise(exercise: Exercise): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, Exercise>("/Routine/CreateExercise", exercise);

    return response.data;
  }

  async getExercisesList(data: PaginateData): Promise<PaginateResponseList<Exercise>> {
    const response = await this.http.post<TickerResponseApi<PaginateResponseList<Exercise>>, PaginateData>("/Routine/GetExercisesList", data);

    return response.data;
  }

  async getMuscleGroups(): Promise<{ label: string; value: string; }[]> {
    const response = await this.http.get<TickerResponseApi<{ label: string; value: string; }[]>>("/Routine/GetMuscleGroups");

    return response.data;
  }

  async getRoutinesList(data: PaginateData): Promise<PaginateResponseList<Routine>> {
    const response = await this.http.post<TickerResponseApi<PaginateResponseList<Routine>>, PaginateData>("/Routine/GetRoutinesList", data);

    return response.data;
  }

  async getRoutineById(id: number): Promise<Routine> {
    const response = await this.http.get<TickerResponseApi<Routine>>(`/Routine/GetRoutineById/${id}`);

    return response.data;
  }

  async desactivateRoutine(id: number): Promise<boolean> {
    const response = await this.http.put<TickerResponseApi<boolean>, null>(`/Routine/DeleteRoutine/${id}`, null);

    return response.data;
  }

  async updateRoutine(routine: Routine): Promise<boolean> {
    const response = await this.http.put<TickerResponseApi<boolean>, Routine>("/Routine/UpdateRoutine", routine);

    return response.data;
  }

  async sendRoutine(data: SendRoutine): Promise<boolean> {
    const response = await this.http.post<TickerResponseApi<boolean>, SendRoutine>("/Routine/SendRoutineToChannel", data);

    return response.data;
  }
}
