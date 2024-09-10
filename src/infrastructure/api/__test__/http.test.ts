import "reflect-metadata";
import { signOut } from "next-auth/react";
import axios from "axios";
import { AxiosHttpClient, HttpClient } from "../http";
import { Container } from "inversify";
import { TYPES } from "@/config/types";
import { jwtDecode } from "jwt-decode";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

jest.mock("jwt-decode", () =>
  jest.fn((token) => ({ exp: Date.now() / 1000 + 600 }))
);

jest.mock("axios");

jest.mock("@/config/secureData", () => ({
  decipherData: jest.fn(), // Asegurarse de que decipherData sea una función mockeada
}));

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(), // Mock de signOut
}));

jest.mock("js-cookie", () => ({
  remove: jest.fn(), // Mock de Cookies.remove
}));

describe("AxiosHttpClient", () => {
  let httpClient: AxiosHttpClient;
  let axiosInstanceMock: any;

  beforeEach(() => {
    const container = new Container();
    container
      .bind<string>(TYPES.BaseUrl)
      .toConstantValue("https://mockapi.com/api");
    container.bind<AxiosHttpClient>(TYPES.HttpClient).to(AxiosHttpClient);

    axiosInstanceMock = {
      interceptors: {
        request: {
          use: jest.fn((callback) => callback), // Mock para registrar el callback
        },
      },
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };

    (axios.create as jest.Mock).mockReturnValue(axiosInstanceMock);

    httpClient = container.get<AxiosHttpClient>(TYPES.HttpClient);

    jest.clearAllMocks();
  });

  it("debería hacer una solicitud GET correctamente", async () => {
    const mockData = { id: 1, name: "Test" };

    axiosInstanceMock.get.mockResolvedValue({
      data: mockData,
      status: 200,
    });

    const result = await httpClient.get("/test");

    expect(result).toEqual(mockData);
    expect(axiosInstanceMock.get).toHaveBeenCalledWith("/test");
  });

  it("debería hacer una solicitud POST correctamente", async () => {
    const mockData = { id: 1, name: "Test" };

    axiosInstanceMock.post.mockResolvedValue({
      data: mockData,
      status: 200,
    });

    const result = await httpClient.post("/test", { data: "data" });

    expect(result).toEqual(mockData);
    expect(axiosInstanceMock.post).toHaveBeenCalledWith("/test", {
      data: "data",
    });
  });

  it("debería hacer una solicitud PUT correctamente", async () => {
    const mockData = { id: 1, name: "Test" };

    axiosInstanceMock.put.mockResolvedValue({
      data: mockData,
      status: 200,
    });

    const result = await httpClient.put("/test", { data: "data" });

    expect(result).toEqual(mockData);
    expect(axiosInstanceMock.put).toHaveBeenCalledWith("/test", {
      data: "data",
    });
  });

  it("debería hacer una solicitud DELETE correctamente", async () => {
    const mockData = { id: 1, name: "Test" };

    axiosInstanceMock.delete.mockResolvedValue({
      data: mockData,
      status: 200,
    });

    const result = await httpClient.delete("/test");

    expect(result).toEqual(mockData);
    expect(axiosInstanceMock.delete).toHaveBeenCalledWith("/test");
  });

  it("debería lanzar un error si la respuesta no tiene un status 2xx", async () => {
    axiosInstanceMock.get.mockResolvedValue({
      data: {},
      status: 400,
      statusText: "Bad Request",
    });

    await expect(httpClient.get("/test")).rejects.toThrow("Bad Request");
  });

  it("debería refrescar el token correctamente", async () => {
    const Cookies = require("js-cookie");
    const mockRefreshToken = "mockRefreshToken";
    const mockNewToken = "mockNewToken";
    const mockResponse = {
      data: {
        data: {
          token: mockNewToken,
        },
      },
      status: 200,
    };

    Cookies.get = jest.fn().mockReturnValue(mockRefreshToken);
    axios.post = jest.fn().mockResolvedValue(mockResponse);

    const result = await (httpClient as any).refreshToken(mockRefreshToken);

    expect(result).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Gym/refreshToken`,
      null,
      {
        headers: {
          RefreshToken: mockRefreshToken,
        },
      }
    );
  });

  it("debería lanzar un error si el token de refresco falla", async () => {
    const Cookies = require("js-cookie");
    const mockRefreshToken = "mockRefreshToken";

    Cookies.get = jest.fn().mockReturnValue(mockRefreshToken);
    axios.post = jest.fn().mockRejectedValue(new Error("Refresh token failed"));

    await expect(
      (httpClient as any).refreshToken(mockRefreshToken)
    ).rejects.toThrow("Refresh token failed");
  });

  it("should set Authorization header with existing token if token is not expired", async () => {
    const Cookies = require("js-cookie");
    const mockAuthToken = "mockAuthToken";

    Cookies.get = jest.fn().mockReturnValue(mockAuthToken);
    (httpClient as any).checkTokenExpiration = jest
      .fn()
      .mockResolvedValue(3 * 60 * 1000);

    const config = { headers: {} as any };
    await (httpClient as any).handleTokenRefresh(config);

    expect(config.headers.Authorization).toBe(`Bearer ${mockAuthToken}`);
  });

  it("should set Authorization header to Bearer if no authToken is present", async () => {
    const Cookies = require("js-cookie");
    Cookies.get = jest.fn().mockReturnValue(null);

    const config = { headers: {} as any };
    await (httpClient as any).handleTokenRefresh(config);

    expect(config.headers.Authorization).toBe("Bearer");
  });

  it("debería llamar a Cookies.remove y signOut en handleAuthenticationError", () => {
    const Cookies = require("js-cookie");
    (httpClient as any).handleAuthenticationError();
    expect(Cookies.remove).toHaveBeenCalledWith("authToken");
    expect(Cookies.remove).toHaveBeenCalledWith("refreshToken");

    expect(signOut).toHaveBeenCalled();
  });
});
