import React from "react";
import { getAccessToken } from "../utils/getToken";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = getAccessToken();

  if (!token) {
    return <div>please login</div>;
  } else {
    return <div>{children}</div>;
  }
}
