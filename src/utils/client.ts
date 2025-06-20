import axios, { AxiosError } from "axios";
import { getAccessToken } from "./getToken";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/constants";

const client = axios.create({
  baseURL: "/api",
});

client.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (res) => res,
  async (e: AxiosError) => {
    if (e.response?.status === 401) {
      alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
      [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY].forEach((token) =>
        localStorage.removeItem(token)
      );
      location.pathname = "/signin";
    }
  }
);

export default client;
