import client from "../utils/client";

interface SigninResponse {
  accessToken: string;
  refreshToken: string;
}
const authService = {
  signin: async (payload: {
    username: string;
    password: string;
  }): Promise<SigninResponse> =>
    (await client.post("/auth/signin", payload)).data,
};

export default authService;
