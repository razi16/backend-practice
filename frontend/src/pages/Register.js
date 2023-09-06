import React, { useState, useEffect } from "react";
import styles from "../styles/register.module.css";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState();

  useEffect(() => {
    console.log(photo);
  }, [photo]);

  const register = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("photo", photo);
    axios
      .post("http://localhost:4000/register", formData)
      .then((res) => console.log(res));
  };

  return (
    <main>
      <h1 className={styles.title}>Register</h1>
      <form onSubmit={register} encType="multipart/form-data">
        <label htmlFor="email">Email: </label>
        <input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="usernamee">Username: </label>
        <input
          className={styles.input}
          id="username"
          name="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Register;
