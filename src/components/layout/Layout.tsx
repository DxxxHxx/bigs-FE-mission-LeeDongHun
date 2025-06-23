import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import useTokenRefresh from "../../hooks/useTokenRefresh";

export default function Layout() {
  useTokenRefresh();
  return (
    <div className="container mx-auto h-screen">
      <Header />
      <main className="h-[calc(100%-56px)]">
        <Outlet />
      </main>
    </div>
  );
}
