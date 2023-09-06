import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import { LoginContext } from "../layout/Main";

function Navbar() {
  const { login, setLogin } = useContext(LoginContext);
  const [className, setClassName] = useState(styles.dropdownClose);
  const [photo, setPhoto] = useState("default.png");

  const navigate = useNavigate();

  const logout = () => {
    axios
      .get("http://localhost:4000/logout", { withCredentials: true })
      .then((res) => {
        setLogin(false);
        navigate("/");
      });
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/auth",
        { withCredentials: true } /* { headers } */
      )
      .then((res) => {
        if (res.data.isLoggedIn) {
          setLogin(true);
          setPhoto(res.data.photo);
        } else {
          setLogin(false);
        }
      });
  }, [login]);

  if (login) {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li
              className={styles.dropdown}
              onMouseOver={() => setClassName(styles.dropdownOpen)}
              onMouseLeave={() => setClassName(styles.dropdownClose)}
            >
              <NavLink to="/login">Login</NavLink>
              <ul className={className}>
                <li>one</li>
                <li>two</li>
                <li>three</li>
              </ul>
            </li>
            <li>
              <NavLink to="/post">Post</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
          <div
            onMouseOver={() => setClassName(styles.dropdownOpen)}
            onMouseLeave={() => setClassName(styles.dropdownClose)}
          >
            <img
              className={styles.profilePhoto}
              src={`http://localhost:4000/image/${photo}`}
              alt="Profile"
            />
            <ul className={className}>
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        </nav>
      </header>
    );
  } else {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li
              className={styles.dropdown}
              onMouseOver={() => setClassName(styles.dropdownOpen)}
              onMouseLeave={() => setClassName(styles.dropdownClose)}
            >
              <NavLink to="/login">Login</NavLink>
              <ul className={className}>
                <li>one</li>
                <li>two</li>
                <li>three</li>
              </ul>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/post">Post</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Navbar;
