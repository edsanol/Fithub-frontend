import { TYPES } from "@/config/types";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { injectable, inject } from "inversify";

export interface HttpClient {
  post<T, U>(url: string, data: U): Promise<T>;
}

@injectable()
export class AxiosHttpClient implements HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(@inject(TYPES.BaseUrl) baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    throw new Error(response.statusText);
  }

  async post<T, U>(url: string, data: U): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data);
    return this.handleResponse(response);
  }
}
