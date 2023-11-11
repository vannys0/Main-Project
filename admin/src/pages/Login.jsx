import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Axios from "axios";
import * as UserController from "../controller/UserController.jsx";
import { AuthContext } from "../App";
import Swal from "sweetalert2";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import SecureStore from "react-secure-storage";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath; //e.g "http://localhost:8080/api";

function Login() {
  const authContext = useContext(AuthContext);
  const user = SecureStore.getItem("userToken");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigateTo = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function loginUser(e) {
    e.preventDefault();

    if (!loginUserName.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(loginUserName)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!loginPassword.trim()) {
      setPasswordError("Password is required");
      return;
    }

    Axios.post(BASE_URL + "/login", {
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Login",
            showConfirmButton: false,
            timer: 3000,
          });
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
        <div className="welcome-div">
          <h2>
            <span className="welcome-span">Welcome back to</span>
            <br />
            E-LEPORIDAE
          </h2>
        </div>
        <form className="form grid">
          <h2 className="login-title">Login</h2>
          <Space direction="vertical">
            <label htmlFor="username" className="email">
              Email
            </label>
            <Input
              style={{ height: "40px", fontSize: "16px" }}
              type="text"
              id="username"
              name="username"
              onChange={handleEmailChange}
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </Space>
          <Space direction="vertical">
            <label htmlFor="password">Password</label>
            <Input.Password
              style={{ display: "flex", height: "40px", fontSize: "16px" }}
              type="password"
              id="password"
              name="password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <span className="error-message">{passwordError}</span>
            )}
          </Space>
          <Button
            style={{ margin: "20px 0px 0px 0px", height: "40px" }}
            type="primary"
            className="btn btn-primary"
            onClick={loginUser}
          >
            <span>Login </span>
          </Button>
          <div>
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
