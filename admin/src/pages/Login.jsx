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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function loginUser(e) {
    e.preventDefault();

    if (!loginUserName.trim()) {
      setEmailError("Please input your email");
      return;
    }

    if (!validateEmail(loginUserName)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!loginPassword.trim()) {
      setPasswordError("Please input your password");
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
          Swal.fire({
            icon: "error",
            title: "Login failed",
            text: "Incorrect email or password.",
          });
          setLoginStatus("Credentials Don't Exist");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred during login. Please try again later.",
        });
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
