import React, { useState, useContext } from "react";
import styles from "../styles/login.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { LoginContext } from "../layout/Main";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, setLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.message === "Success") {
          setLogin(true);
          navigate("/");
        } else {
          console.log(res);
        }
      });
  };

  return (
    <main>
      <h1 className={styles.title}>Login</h1>
      <form encType="multipart/form-data" onSubmit={handleLogin}>
        <label htmlFor="email">Email: </label>
        <input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password: </label>
        <input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default Login;
