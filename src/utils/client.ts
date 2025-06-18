import axios from "axios";
import { getAccessToken } from "./getToken";

const serverURl = import.meta.env.VITE_SERVER_URL;

const client = axios.create({
  baseURL: serverURl,
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

export default client;
