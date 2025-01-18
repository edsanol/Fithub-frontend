import { TYPES } from "@/config/types";
import { Exercise } from "@/domain/entities/Exercise";
import { Routine } from "@/domain/entities/Routine";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { SendRoutine } from "@/domain/models/SendRoutine";
import { RoutineRepository } from "@/domain/repositories/routineRepository";
import type { RoutineService } from "@/domain/services/routineService";
import { inject, injectable } from "inversify";

@injectable()
export class RoutineRepositoryImpl implements RoutineRepository {
  private readonly service: RoutineService;

  constructor(@inject(TYPES.RoutineService) service: RoutineService) {
    this.service = service;
  }

  async createRoutine(routine: Routine): Promise<boolean> {
    const response = await this.service.createRoutine(routine);

    return response;
  }

  async createExercise(exercise: Exercise): Promise<boolean> {
    const response = await this.service.createExercise(exercise);

    return response;
  }

  async getExercisesList(data: PaginateData): Promise<PaginateResponseList<Exercise>> {
    const response = await this.service.getExercisesList(data);

    return response;
  }

  async getMuscleGroups(): Promise<{ label: string; value: string; }[]> {
    const response = await this.service.getMuscleGroups();

    return response;
  }

  async getRoutinesList(data: PaginateData): Promise<PaginateResponseList<Routine>> {
    const response = await this.service.getRoutinesList(data);

    return response;
  }

  async getRoutineById(id: number): Promise<Routine> {
    const response = await this.service.getRoutineById(id);

    return response;
  }

  async desactivateRoutine(id: number): Promise<boolean> {
    const response = await this.service.desactivateRoutine(id);

    return response;
  }

  async updateRoutine(routine: Routine): Promise<boolean> {
    const response = await this.service.updateRoutine(routine);

    return response;
  }

  async sendRoutine(data: SendRoutine): Promise<boolean> {
    const response = await this.service.sendRoutine(data);

    return response;
  }
}
