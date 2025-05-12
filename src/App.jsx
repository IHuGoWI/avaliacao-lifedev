import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "./hooks/useAuthentication";
import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home/index";
import LoginPage from "./pages/Login/index";
import RegisterPage from "./pages/Register/index";
import AboutPage from "./pages/About/index";
import CreatePostPage from "./pages/CreatePost/index";
import DashboardPage from "./pages/Dashboard/index";
import SearchResultPage from "./pages/SearchResult/index";
import PostViewPage from "./pages/PostView/index";
import EditPostPage from "./pages/EditPost/index";
import RecoverPasswordPage from "./pages/RecoveryPassword/index";
import NotFound from "./components/NotFound";
import PrivateRoute from "./Routes/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";

import "./App.css";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const isLoading = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />

          <div className="container p-4 py-24 mx-auto min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/search" element={<SearchResultPage />} />
              <Route path="/post/:id" element={<PostViewPage />} />
              <Route
                path="/recuperar-senha"
                element={<RecoverPasswordPage />}
              />

              <Route
                path="/login"
                element={!user ? <LoginPage /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <RegisterPage /> : <Navigate to="/" />}
              />

              <Route
                path="/post/new"
                element={
                  <PrivateRoute>
                    {" "}
                    <CreatePostPage />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="/post/edit/:id"
                element={
                  <PrivateRoute>
                    {" "}
                    <EditPostPage />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    {" "}
                    <DashboardPage />{" "}
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
