import React, { useEffect, useContext } from "react";
import { LoginContext } from "../layout/Main";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/auth",
        { withCredentials: true } /* { headers } */
      )
      .then((res) => {
        if (!res.data.isLoggedIn) {
          navigate("/login");
        }
      });
  }, []);

  return <Outlet />;
}

export default ProtectedRoutes;
