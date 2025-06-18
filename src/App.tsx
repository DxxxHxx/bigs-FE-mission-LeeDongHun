import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AuthGuard from "./components/AuthGuard";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
