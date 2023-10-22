import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";

const Register = () => {
  //holds the input
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  //onclick mf
  const createUser = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:8081/register", {
      Email: email,
      UserName: userName,
      Password: password,
    }).then(() => {
      //register page to login page
      navigateTo("/");

      //clear the fields
      setEmail("");
      setUserName("");
    });
  };

  return (
    <div className="loginPage flex">
      <div className="container ">
        <div className="welcome-div">
          <h2>
            <span className="welcome-span">Welcome back to</span>
            <br />
            E-LEPORIDAE
          </h2>
        </div>
        <form className="form grid">
          <h2 className="login-title">Administrator</h2>
          <div className="inputDiv">
            <label htmlFor="username">Name</label>
            <div className="input flex">
              <BiUser className="icons" />
              <input
                type="text"
                id="username"
                autoComplete="on"
                placeholder="Enter your name"
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="inputDiv">
            <label htmlFor="email">Email</label>
            <div className="input flex">
              <AiOutlineMail className="icons" />
              <input
                type="email"
                id="email"
                autoComplete="on"
                placeholder="Enter your email"
                onChange={(event) => {
                  setEmail(event.target.value);
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
                autoComplete="on"
                placeholder="Enter your password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="register-btn"
            onClick={createUser}
          >
            <span>Sign up</span>
          </button>
          <div>
            Already have an account? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
