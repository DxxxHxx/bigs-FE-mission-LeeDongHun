import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useAuth();

  if (!user) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
            />
          </svg>
        </h1>
        <p className="text-xl text-gray-600 mb-8">로그인이 필요합니다</p>
        <p className="text-gray-500 mb-8 text-center">
          이 페이지의 콘텐츠를 보시려면 먼저 로그인해주세요.
        </p>
        <Link
          to={"/signin"}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          로그인
        </Link>
      </div>
    );
  } else {
    return <div className="h-full">{children}</div>;
  }
}
