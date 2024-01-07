import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login_Signup.css";
import axios from "axios";
import * as UserController from "../controller/UserController.jsx";
import { AuthContext } from "../App";
import Swal from "sweetalert2";
import { AiOutlineMail } from "react-icons/ai";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import collaborators from "../images/collaborators.svg";
import coding from "../images/coding.svg";
import SecureStore from "react-secure-storage";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Login() {
  const authContext = useContext(AuthContext);
  const user = SecureStore.getItem("userToken");
  const navigateTo = useNavigate();
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function loginUser(e) {
    e.preventDefault();

    if (!validateEmail(loginUserName)) {
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
      }, 5000);
      return;
    }

    axios
      .post(BASE_URL + "/login", {
        LoginUserName: loginUserName,
        LoginPassword: loginPassword,
      })
      .then((response) => {
        const user = response.data[0];
        if (
          user &&
          user.email === loginUserName &&
          user.password === loginPassword
        ) {
          SecureStore.setItem("userToken", user);
          authContext.signIn(user);
          navigateTo("/dashboard");
        } else {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setErrorLogin(true);
        setTimeout(() => {
          setErrorLogin(false);
        }, 5000);
      });
  }

  function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  }

  function handleEmailChange(e) {
    setLoginUserName(e.target.value);
    setEmailError("");
  }

  function handlePasswordChange(e) {
    setLoginPassword(e.target.value);
    setPasswordError("");
  }

  return (
    <div className="loginPage">
      <div className="container">
        <form className="form grid bg-light" onSubmit={loginUser}>
          <h3 className="brand-name">eLeporidae</h3>
          <h3 className="login-title">Welcome back Admin</h3>
          <div className="inputs">
            {emailError && (
              <div
                className="alert alert-warning d-flex align-items-center"
                role="alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div>Invalid email format</div>
              </div>
            )}
            {showAlert && (
              <div
                className="d-flex align-items-center alert alert-danger"
                role="alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                Incorrect email or password
              </div>
            )}
            {errorLogin && (
              <div
                className="d-flex align-items-center alert alert-danger"
                role="alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div>An error occurred during login</div>
              </div>
            )}
            <div className="input">
              <AiOutlineMail className="icons" />
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleEmailChange}
                required
              />
              <label htmlFor="" className="bg-light">
                Enter your email
              </label>
            </div>
            <div className="input">
              <span
                className="d-flex align-items-center justify-content-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeTwoTone className="icons" />
                ) : (
                  <EyeInvisibleOutlined className="icons" />
                )}
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="email"
                id="email"
                onChange={handlePasswordChange}
                required
              />
              <label htmlFor="" className="bg-light">
                Enter your password
              </label>
            </div>
            {passwordError && (
              <span className="text-danger">{passwordError}</span>
            )}
          </div>
          <button type="submit" className="submit login-btn">
            Sign in
          </button>
          <div>
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
