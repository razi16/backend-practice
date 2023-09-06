import React, { useState, useEffect } from "react";
import axios from "axios";

export const Context = React.createContext();

function LoginContext({ children }) {
  useEffect(() => {
    axios
      .get("http://localhost:4000/auth", { withCredentials: true })
      .then((res) => console.log(res));
  }, []);

  const [login, setLogin] = useState(false);

  return (
    <Context.Provider value={{ login, setLogin }}>{children}</Context.Provider>
  );
}

export default LoginContext;
