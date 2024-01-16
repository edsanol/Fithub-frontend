import { decipherData } from "@/config/secureData";
import { TYPES } from "@/config/types";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { injectable, inject } from "inversify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";

export interface HttpClient {
  post<T, U>(url: string, data: U, config?: AxiosRequestConfig): Promise<T>;
  put<T, U>(url: string, data: U): Promise<T>;
  get<T>(url: string): Promise<T>;
  delete<T>(url: string): Promise<T>;
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

    const authToken = Cookies.get("authToken");

    this.axiosInstance.interceptors.request.use(async (config) => {
      await this.handleTokenRefresh(config);
      return config;
    });
  }

  private async handleTokenRefresh(config: AxiosRequestConfig) {
    const authToken = Cookies.get("authToken");
    if (authToken && config.headers) {
      const timeDifference = await this.checkTokenExpiration(authToken);
      if (timeDifference < 2 * 60 * 1000) {
        const refreshTokenEncrypted = Cookies.get("refreshToken");
        const refreshToken = decipherData(refreshTokenEncrypted as string);
        try {
          if (refreshToken) {
            const response = await this.refreshToken(refreshToken);
            if (response.status === 200) {
              Cookies.set("authToken", response.data.data.token, {
                expires: 1,
              });
              config.headers.Authorization = `Bearer ${response.data.data.token}`;
            }
          }
        } catch (error) {
          this.handleAuthenticationError();
        }
      } else {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    } else {
      this.handleAuthenticationError();
    }
  }

  private async refreshToken(refreshToken: string) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Gym/refreshToken`,
      null,
      {
        headers: {
          RefreshToken: refreshToken,
        },
      }
    );

    return response;
  }

  private async checkTokenExpiration(token: string) {
    const decodedToken = jwtDecode(token);
    const currentDate = new Date();
    const expirationDate = new Date((decodedToken.exp as number) * 1000);

    const timeDifference = expirationDate.getTime() - currentDate.getTime();
    return timeDifference;
  }

  private handleAuthenticationError() {
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    signOut();
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    throw new Error(response.statusText);
  }

  async post<T, U>(
    url: string,
    data: U,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config
    );
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

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url);
    return this.handleResponse(response);
  }
}
