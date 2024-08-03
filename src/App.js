import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { NotFound } from "./pages/notfound/NotFound";
import Header from "./components/layouts/Header";
import { Post } from "./pages/posts/Post";
import { Signup } from "./pages/auth/signup/Signup";
import { Login } from "./pages/auth/login/Login";
import ProtectRoutes from "./components/ProtectRoutes";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { CreatePost } from "./pages/dashboard/CreatePost";
import { EditPost } from "./pages/dashboard/editPost/EditPost";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="main-container">
          <Header />
        </div>
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route element={<ProtectRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/posts/create" element={<CreatePost />} />
              <Route path="/dashboard/posts/:id" element={<EditPost />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
