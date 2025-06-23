import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AuthGuard from "./components/AuthGuard";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailPage from "./pages/PostDetailPage";
import UpdatePostPage from "./pages/UpdatePostPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<AuthGuard />}>
            <Route path="/" element={<Home />} />
            <Route path="/posts/new" element={<CreatePostPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/posts/update/:id" element={<UpdatePostPage />} />
          </Route>

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
