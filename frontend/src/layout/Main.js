import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Undefined from "../pages/Undefined";
import Navbar from "../components/Navbar";
import Upload from "../pages/Upload";
import ProtectedRoutes from "../pages/ProtectedRoutes";
import Post from "../pages/Post";
import Postpage from "../pages/Postpage";

export const LoginContext = React.createContext();

function Main() {
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ login, setLogin }}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<Post />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/post/upload" element={<Upload />} />
          </Route>
          <Route path="/post/:id" element={<Postpage />} />
          <Route path="*" element={<Undefined />} />
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default Main;
