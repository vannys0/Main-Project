import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Axios from "axios";
import * as UserController from "../controller/UserController.jsx";
import { AuthContext } from "../App";
import Swal from "sweetalert2";
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
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Successfully Login",
          showConfirmButton: false,
          timer: 2500,
        });
        navigateTo("/dashboard"); // if the credebntial match in db
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incoorect email or password!",
        });
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
          <h2 className="login-title">Login</h2>
          <div className="inputDiv">
            <div className="input flex">
              <AiOutlineMail className="icons page-icon" />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Email"
                autoComplete="on"
                onChange={(event) => {
                  setLoginUserName(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="inputDiv">
            <div className="input flex">
              <RiLockPasswordLine className="icons page-icon" />
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="on"
                placeholder="Password"
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
              />
            </div>
          </div>
          <button
            style={{ margin: "20px 0px 0px 0px" }}
            type="submit"
            className="btn btn-primary"
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
