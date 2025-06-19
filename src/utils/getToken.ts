import { ACCESS_TOKEN_KEY } from "../constants/constants";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
