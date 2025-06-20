import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/getToken";
import { jwtDecode } from "jwt-decode";
import type { UserInfo } from "../types/interface";

export default function useAuth() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    const user = jwtDecode(token) as UserInfo;
    setUser(user);
  }, []);

  return user;
}
