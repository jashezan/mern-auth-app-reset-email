import { Routes, Route, Navigate } from "react-router-dom";

// importing components
import PageNotFound from "./pages/PageNotFound";
import Password from "./pages/Password";
import Profile from "./pages/Profile";
import Recovery from "./pages/Recovery";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

// Main function
const App = () => {
  const userLoggedin = true;
  const links = [
    { path: "/", Component: <Home /> },
    { path: "/login", Component: <Login /> },
    { path: "/password", Component: <Password /> },
    { path: "/profile", Component: <Profile /> },
    { path: "/recovery", Component: <Recovery /> },
    { path: "/register", Component: <Register /> },
    { path: "/reset", Component: <Reset /> },
    { path: "*", Component: <PageNotFound /> },
  ];

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="w-3/4 mx-auto">
        <Routes>
          {links &&
            links.map((link, index) => {
              if (!userLoggedin && (link.path === "/" || link.path === "")) {
                return (
                  <Route
                    path={link.path}
                    element={<Navigate to={"/login"} />}
                  />
                );
              }
              return (
                <Route key={index} path={link.path} element={link.Component} />
              );
            })}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
