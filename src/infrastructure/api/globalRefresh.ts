import axios, { AxiosResponse } from "axios";

let globalRefreshPromise: Promise<AxiosResponse<any>> | null = null;

export async function getGlobalRefreshPromise(refreshToken: string): Promise<AxiosResponse<any>> {
  if (!globalRefreshPromise) {
    globalRefreshPromise = axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Gym/refreshToken`, null, { headers: { RefreshToken: refreshToken } })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        globalRefreshPromise = null;
      });
  }

  return globalRefreshPromise;
}
