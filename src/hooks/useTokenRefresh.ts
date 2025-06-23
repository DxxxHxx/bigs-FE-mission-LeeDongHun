import { useEffect, useRef } from "react";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/constants";
import { jwtDecode } from "jwt-decode";
import type { UserInfo } from "../types/interface";
import authService from "../service/authService";

export default function useTokenRefresh() {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return;

    const { exp } = jwtDecode<UserInfo>(token);

    const scheduleRefresh = (expireTime: number) => {
      const expiresAtMs = expireTime * 1000; // 만료 시간
      const nowMs = Date.now(); // 현재
      const saftyTime = 60 * 1000; // 만료 1분 전
      const delay = Math.max(expiresAtMs - nowMs - saftyTime, 0);

      // 기존 타이머 해제
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(async () => {
        try {
          const { accessToken, refreshToken } = await authService.refresh();

          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
          // 새 토큰에서 exp 다시 파싱 후 새로운 타이머 세팅
          const { exp: newExp } = jwtDecode<UserInfo>(accessToken);
          scheduleRefresh(newExp);
        } catch {
          // 갱신 실패
          alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
          [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY].forEach((token) =>
            localStorage.removeItem(token)
          );
          location.href = "/signin";
        }
      }, delay);
    };

    scheduleRefresh(exp);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
}
