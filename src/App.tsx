import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AuthGuard from "./components/AuthGuard";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import type { JSX } from "react";
import SignupPage from "./pages/SignupPage";

interface RouteListProp {
  id: number;
  path: string;
  element: JSX.Element;
}
const ROUTE_LIST: RouteListProp[] = [
  {
    id: 1,
    path: "/",
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    ),
  },
  { id: 2, path: "/*", element: <NotFoundPage /> },
  { id: 3, path: "/signup", element: <SignupPage /> },
];
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {ROUTE_LIST.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
