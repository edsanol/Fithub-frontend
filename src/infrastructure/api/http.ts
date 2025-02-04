import { TYPES } from "@/config/types";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { injectable, inject } from "inversify";
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";
import { getGlobalRefreshPromise } from "./globalRefresh";
import { decryptToken, encryptToken } from "@/config/secureData";

export interface HttpClient {
  post<T, U>(url: string, data: U): Promise<T>;
  put<T, U>(url: string, data: U): Promise<T>;
  get<T>(url: string): Promise<T>;
  delete<T, U>(url: string, data: U): Promise<T>;
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

    this.axiosInstance.interceptors.request.use(async (config) => {
      await this.handleTokenRefresh(config);
      return config;
    });
  }

  private async handleTokenRefresh(config: AxiosRequestConfig) {
    if (typeof window === "undefined") return;

    const storedToken = localStorage.getItem("secureData");
    const authToken = storedToken ? decryptToken(storedToken) : null;

    if (authToken && config.headers) {
      const timeDifference = await this.checkTokenExpiration(authToken);

      if (timeDifference < 2 * 60 * 1000) {
        const storedCurrentToken = localStorage.getItem("secureData");
        const currentToken = storedCurrentToken ? decryptToken(storedCurrentToken) : null;

        if (currentToken && (await this.checkTokenExpiration(currentToken)) >= 2 * 60 * 1000) {
          config.headers.Authorization = `Bearer ${currentToken}`;
          return;
        }

        const storedRefreshToken = localStorage.getItem("syncCode");
        const refreshToken = storedRefreshToken ? decryptToken(storedRefreshToken) : null;

        if (!refreshToken) {
          console.error("No existe refreshToken en localStorage");
          this.handleAuthenticationError();
          return;
        }
        try {
          const response = await getGlobalRefreshPromise(refreshToken);

          const newToken = encryptToken(response.data.data.token);
          const newRefreshToken = encryptToken(response.data.data.refreshToken);

          localStorage.setItem("secureData", newToken);
          localStorage.setItem("syncCode", newRefreshToken);

          config.headers.Authorization = `Bearer ${response.data.data.token}`;
        } catch (error) {
          console.error("Error al refrescar token dentro del global lock:", error);
          this.handleAuthenticationError();
          throw error;
        }
      } else {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    } else {
      if (config.headers) {
        config.headers.Authorization = `Bearer`;
      }
    }
  }

  private async checkTokenExpiration(token: string): Promise<number> {
    try {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date();
      const expirationDate = new Date((decodedToken.exp as number) * 1000);
      return expirationDate.getTime() - currentDate.getTime();
    } catch (error) {
      console.error("Error decodificando el token:", error);
      return -1;
    }
  }

  private handleAuthenticationError() {
    if (typeof window === 'undefined') return;

    localStorage.removeItem("secureData");
    localStorage.removeItem("syncCode");
    signOut();
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

  async put<T, U>(url: string, data: U): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data);
    return this.handleResponse(response);
  }

  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url);
    return this.handleResponse(response);
  }

  async delete<T, U>(url: string, data: U): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, { data });
    return this.handleResponse(response);
  }
}
