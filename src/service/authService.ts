import type { SignupFormState } from "../components/signup/SignupForm";
import { REFRESH_TOKEN_KEY } from "../constants/constants";
import client from "../utils/client";

interface SigninResponse {
  accessToken: string;
  refreshToken: string;
}

interface Payload {
  username: string;
  password: string;
}
const authService = {
  signin: async (payload: Payload): Promise<SigninResponse> =>
    (await client.post("/auth/signin", payload)).data,
  refresh: async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    const res: SigninResponse = (
      await client.post("/auth/refresh", { refreshToken })
    ).data;

    return res;
  },
  signup: async (payload: SignupFormState) =>
    await client.post("/auth/signup", payload),
};

export default authService;
