import "reflect-metadata";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";
import { AxiosHttpClient } from "../http";
import { decipherData } from "@/config/secureData";

jest.mock("axios");
jest.mock("js-cookie");
jest.mock("jwt-decode");
jest.mock("next-auth/react");

jest.mock("@/config/secureData", () => ({
  decipherData: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedCookies = Cookies as jest.Mocked<typeof Cookies>;
const mockedJwtDecode = jwtDecode as jest.MockedFunction<typeof jwtDecode>;
const mockedSignOut = signOut as jest.MockedFunction<typeof signOut>;
const mockedDecipherData = decipherData as jest.MockedFunction<
  typeof decipherData
>;

describe("AxiosHttpClient", () => {
  let axiosHttpClient: AxiosHttpClient;
  let axiosInstance: AxiosInstance;

  const baseUrl = "https://example.com";

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock de axios.create para devolver una instancia de Axios
    axiosInstance = {
      interceptors: {
        request: {
          use: jest.fn(),
        },
      },
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
    } as unknown as AxiosInstance;

    mockedAxios.create.mockReturnValue(axiosInstance);

    // Creación de la instancia de AxiosHttpClient
    axiosHttpClient = new AxiosHttpClient(baseUrl);
  });

  it("debe crear una instancia de axios con el baseURL correcto", () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("debe configurar el interceptor de solicitud", () => {
    expect(axiosInstance.interceptors.request.use).toHaveBeenCalled();
  });

  it("debe agregar el header Authorization si el authToken está presente y no está cerca de expirar", async () => {
    // Ajuste aquí
    (
      mockedCookies.get as unknown as jest.MockedFunction<
        (name: string) => string | undefined
      >
    ).mockImplementation((key: string) => {
      if (key === "authToken") return "validAuthToken";
      return undefined;
    });

    jest
      .spyOn(axiosHttpClient as any, "checkTokenExpiration")
      .mockResolvedValue(3 * 60 * 1000);

    const config: AxiosRequestConfig = { headers: {} };

    await (axiosHttpClient as any).handleTokenRefresh(config);

    expect(config.headers!.Authorization).toBe("Bearer validAuthToken");
  });

  it("debe refrescar el token si el authToken está cerca de expirar", async () => {
    // Configurar el mock de Cookies.get
    (
      mockedCookies.get as unknown as jest.MockedFunction<
        (name: string) => string | undefined
      >
    ).mockImplementation((key: string) => {
      if (key === "authToken") return "expiringAuthToken";
      if (key === "refreshToken") return "encryptedRefreshToken";
      return undefined;
    });

    // Mock de checkTokenExpiration para devolver 1 minuto
    jest
      .spyOn(axiosHttpClient as any, "checkTokenExpiration")
      .mockResolvedValue(1 * 60 * 1000);

    // Mock de decipherData para devolver 'refreshToken'
    mockedDecipherData.mockReturnValue("refreshToken");

    // Mock de refreshToken para devolver la nueva respuesta de token
    const refreshTokenResponse = {
      status: 200,
      data: {
        data: {
          token: "newAuthToken",
        },
      },
    } as AxiosResponse;

    jest
      .spyOn(axiosHttpClient as any, "refreshToken")
      .mockResolvedValue(refreshTokenResponse);

    const config: AxiosRequestConfig = { headers: {} };

    await (axiosHttpClient as any).handleTokenRefresh(config);

    expect(mockedCookies.set).toHaveBeenCalledWith(
      "authToken",
      "newAuthToken",
      { expires: 1 }
    );
    expect(config.headers!.Authorization).toBe("Bearer newAuthToken");
  });

  it("debe manejar errores de autenticación si el refresh token es inválido", async () => {
    (
      mockedCookies.get as unknown as jest.MockedFunction<
        (name: string) => string | undefined
      >
    ).mockImplementation((key: string) => {
      if (key === "authToken") return "expiringAuthToken";
      if (key === "refreshToken") return "encryptedRefreshToken";
      return undefined;
    });

    jest
      .spyOn(axiosHttpClient as any, "checkTokenExpiration")
      .mockResolvedValue(1 * 60 * 1000);

    jest.mock("@/config/secureData", () => ({
      decipherData: jest.fn().mockReturnValue("refreshToken"),
    }));

    jest
      .spyOn(axiosHttpClient as any, "refreshToken")
      .mockRejectedValue(new Error("Invalid token"));

    const handleAuthErrorSpy = jest.spyOn(
      axiosHttpClient as any,
      "handleAuthenticationError"
    );

    const config: AxiosRequestConfig = { headers: {} };

    await (axiosHttpClient as any).handleTokenRefresh(config);

    expect(handleAuthErrorSpy).toHaveBeenCalled();
    expect(mockedCookies.remove).toHaveBeenCalledWith("authToken");
    expect(mockedCookies.remove).toHaveBeenCalledWith("refreshToken");
    expect(mockedSignOut).toHaveBeenCalled();
  });

  it("debe enviar una solicitud POST al endpoint de refreshToken", async () => {
    const refreshToken = "refreshToken";

    const response = {
      status: 200,
      data: {
        data: {
          token: "newAuthToken",
        },
      },
    } as AxiosResponse;

    mockedAxios.post.mockResolvedValue(response);

    const result = await (axiosHttpClient as any).refreshToken(refreshToken);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Gym/refreshToken`,
      null,
      {
        headers: {
          RefreshToken: refreshToken,
        },
      }
    );

    expect(result).toBe(response);
  });

  it("debe devolver la diferencia de tiempo entre la expiración del token y el tiempo actual", async () => {
    const token = "authToken";

    const decodedToken = {
      exp: Math.floor(Date.now() / 1000) + 300, // expira en 5 minutos
    };

    mockedJwtDecode.mockReturnValue(decodedToken);

    const timeDifference = await (axiosHttpClient as any).checkTokenExpiration(
      token
    );

    expect(mockedJwtDecode).toHaveBeenCalledWith(token);
    expect(timeDifference).toBeGreaterThan(4 * 60 * 1000);
    expect(timeDifference).toBeLessThan(5 * 60 * 1000 + 1000);
  });

  it("debe eliminar los tokens y cerrar sesión", () => {
    (axiosHttpClient as any).handleAuthenticationError();

    expect(mockedCookies.remove).toHaveBeenCalledWith("authToken");
    expect(mockedCookies.remove).toHaveBeenCalledWith("refreshToken");
    expect(mockedSignOut).toHaveBeenCalled();
  });

  it("debe devolver los datos si la respuesta tiene estado 2xx", () => {
    const response = {
      status: 200,
      data: { success: true },
      statusText: "OK",
    } as AxiosResponse;

    const result = (axiosHttpClient as any).handleResponse(response);

    expect(result).toEqual({ success: true });
  });

  it("debe lanzar un error si la respuesta no tiene estado 2xx", () => {
    const response = {
      status: 400,
      data: { success: false },
      statusText: "Bad Request",
    } as AxiosResponse;

    expect(() => (axiosHttpClient as any).handleResponse(response)).toThrow(
      "Bad Request"
    );
  });

  describe("refreshToken", () => {
    it("debe enviar una solicitud POST al endpoint de refreshToken", async () => {
      const refreshToken = "refreshToken";

      const response = {
        status: 200,
        data: {
          data: {
            token: "newAuthToken",
          },
        },
      } as AxiosResponse;

      mockedAxios.post.mockResolvedValue(response);

      const result = await (axiosHttpClient as any).refreshToken(refreshToken);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Gym/refreshToken`,
        null,
        {
          headers: {
            RefreshToken: refreshToken,
          },
        }
      );

      expect(result).toBe(response);
    });
  });

  describe("checkTokenExpiration", () => {
    it("debe devolver la diferencia de tiempo entre la expiración del token y el tiempo actual", async () => {
      const token = "authToken";

      const decodedToken = {
        exp: Math.floor(Date.now() / 1000) + 300, // expira en 5 minutos
      };

      mockedJwtDecode.mockReturnValue(decodedToken);

      const timeDifference = await (
        axiosHttpClient as any
      ).checkTokenExpiration(token);

      expect(mockedJwtDecode).toHaveBeenCalledWith(token);
      expect(timeDifference).toBeGreaterThan(4 * 60 * 1000);
      expect(timeDifference).toBeLessThan(5 * 60 * 1000 + 1000);
    });
  });

  describe("handleAuthenticationError", () => {
    it("debe eliminar los tokens y cerrar sesión", () => {
      (axiosHttpClient as any).handleAuthenticationError();

      expect(mockedCookies.remove).toHaveBeenCalledWith("authToken");
      expect(mockedCookies.remove).toHaveBeenCalledWith("refreshToken");
      expect(mockedSignOut).toHaveBeenCalled();
    });
  });

  describe("handleResponse", () => {
    it("debe devolver los datos si la respuesta tiene estado 2xx", () => {
      const response = {
        status: 200,
        data: { success: true },
        statusText: "OK",
      } as AxiosResponse;

      const result = (axiosHttpClient as any).handleResponse(response);

      expect(result).toEqual({ success: true });
    });

    it("debe lanzar un error si la respuesta no tiene estado 2xx", () => {
      const response = {
        status: 400,
        data: { success: false },
        statusText: "Bad Request",
      } as AxiosResponse;

      expect(() => (axiosHttpClient as any).handleResponse(response)).toThrow(
        "Bad Request"
      );
    });
  });

  describe("Métodos HTTP", () => {
    const url = "/test";
    const data = { key: "value" };
    const responseData = { result: "success" };
    const response = {
      status: 200,
      data: responseData,
      statusText: "OK",
    } as AxiosResponse;

    beforeEach(() => {
      jest
        .spyOn(axiosHttpClient as any, "handleResponse")
        .mockReturnValue(responseData);
    });

    it("post debe enviar una solicitud POST y manejar la respuesta", async () => {
      (axiosInstance.post as jest.Mock).mockResolvedValue(response);

      const result = await axiosHttpClient.post(url, data);

      expect(axiosInstance.post).toHaveBeenCalledWith(url, data);
      expect((axiosHttpClient as any).handleResponse).toHaveBeenCalledWith(
        response
      );
      expect(result).toEqual(responseData);
    });

    it("put debe enviar una solicitud PUT y manejar la respuesta", async () => {
      (axiosInstance.put as jest.Mock).mockResolvedValue(response);

      const result = await axiosHttpClient.put(url, data);

      expect(axiosInstance.put).toHaveBeenCalledWith(url, data);
      expect((axiosHttpClient as any).handleResponse).toHaveBeenCalledWith(
        response
      );
      expect(result).toEqual(responseData);
    });

    it("get debe enviar una solicitud GET y manejar la respuesta", async () => {
      (axiosInstance.get as jest.Mock).mockResolvedValue(response);

      const result = await axiosHttpClient.get(url);

      expect(axiosInstance.get).toHaveBeenCalledWith(url);
      expect((axiosHttpClient as any).handleResponse).toHaveBeenCalledWith(
        response
      );
      expect(result).toEqual(responseData);
    });

    it("delete debe enviar una solicitud DELETE y manejar la respuesta", async () => {
      (axiosInstance.delete as jest.Mock).mockResolvedValue(response);

      const result = await axiosHttpClient.delete(url);

      expect(axiosInstance.delete).toHaveBeenCalledWith(url);
      expect((axiosHttpClient as any).handleResponse).toHaveBeenCalledWith(
        response
      );
      expect(result).toEqual(responseData);
    });
  });
});
