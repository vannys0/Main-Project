import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Axios from "axios";
import * as UserController from "../controller/UserController.jsx";
import { AuthContext } from "../App";

import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath; //e.g "http://localhost:8080/api";
import SecureStore from "react-secure-storage";

function Login() {
  const authContext = useContext(AuthContext);

  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigateTo = useNavigate();

  const [loginStatus, setLoginStatus] = useState("");

  function loginUser(e) {
    e.preventDefault();

    Axios.post(BASE_URL + "/login", {
      LoginUserName: loginUserName,
      LoginPassowrd: loginPassword,
    }).then((response) => {
      const user = response.data[0];
      if (user.email === loginUserName && user.password === loginPassword) {
        SecureStore.setItem("userToken", user);
        authContext.signIn(user);
        navigateTo("/dashboard"); // if the credebntial match in db
      } else {
        navigateTo("/"); // navigate to login page
        setLoginStatus("Credential Dont Exist ");
      }
    });
  }

  //   useEffect(()=>{
  //       if(loginStatus !== '') {
  //           setstatusHolder('showMessage')//show vessage
  //           setTimeout(()=>{
  //               setstatusHolder('message')//hide mofo message
  //           }, 4000);
  //       }
  //   }, [loginStatus])

  const onSubmit = () => {};

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
        <form className="form grid" onSubmit={onSubmit}>
          <h2 className="login-title">Administrator</h2>
          <div className="inputDiv">
            <label htmlFor="username">Email</label>
            <div className="input flex">
              <AiOutlineMail className="icons" />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your email"
                autoComplete="on"
                onChange={(event) => {
                  setLoginUserName(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <div className="input flex">
              <RiLockPasswordLine className="icons" />
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="on"
                placeholder="Enter your password"
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="login-btn"
            onClick={loginUser}
          >
            <span>Login </span>
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
