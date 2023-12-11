import React, { useState } from "react";
import "./Login_Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button } from "antd";
import personalization from "../images/personalization.svg";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

const Register = () => {
  const navigateTo = useNavigate();
  const [values, setValues] = useState({
    id: uuidv4(),
    fullname: "",
    email: "",
    password: "",
    user_type: "admin",
  });

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.fullname || !values.email || !values.password) {
      alert("Please fill all fields!");
    } else {
      axios
        .post(BASE_URL + "/register", values)
        .then((res) => {
          navigateTo("/");
        })
        .catch((err) => {
          console.error(err);
          alert(err);
        });
    }
  };

  return (
    <div className="loginPage flex">
      <div className="container ">
        <div className="welcome-div">
          <h2>E-LEPORIDAE</h2>
          <img src={personalization} alt="" />
        </div>
        <form className="form grid">
          <h2 className="login-title">Create your account</h2>
          <div className="coolinput">
            <label htmlFor="input" className="text">
              Full Name:
            </label>
            <input
              type="text"
              name="fullname"
              className="input"
              onChange={handleInput}
            />
          </div>
          <div className="coolinput">
            <label htmlFor="input" className="text">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              onChange={handleInput}
            />
          </div>
          <div className="coolinput">
            <label htmlFor="input" className="text">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              onChange={handleInput}
            />
          </div>
          <Button
            style={{ margin: "20px 0px 0px 0px", height: "40px" }}
            type="primary"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            <span>Sign up</span>
          </Button>
          <div>
            Already have an account? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
