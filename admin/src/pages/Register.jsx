import React, { useState } from "react";
import "./Login_Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";
import { LuUser } from "react-icons/lu";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { AiOutlineMail } from "react-icons/ai";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

const Register = () => {
  const navigateTo = useNavigate();
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    user_type: "admin",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        <form className="form grid bg-light" onSubmit={handleSubmit}>
          <h3 className="brand-name">eLeporidae</h3>
          <h3 className="login-title">Create your account</h3>
          <div className="inputs">
            <div className="input">
              <LuUser className="icons" />
              <input
                type="text"
                name="fullname"
                onChange={handleInput}
                required
              />
              <label htmlFor="" className="bg-light">
                Enter your full name
              </label>
            </div>
            <div className="input">
              <AiOutlineMail className="icons" />
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleInput}
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
                name="password"
                id="password"
                onChange={handleInput}
                required
              />
              <label htmlFor="" className="bg-light">
                Enter your password
              </label>
            </div>
          </div>
          {/* <div className="coolinput">
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
          </div> */}
          {/* <div className="coolinput">
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
          </div> */}
          {/* <Button
            style={{ margin: "20px 0px 0px 0px", height: "40px" }}
            type="primary"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            <span>Sign up</span>
          </Button> */}
          <button type="submit" className="submit login-btn">
            Sign up
          </button>
          <div>
            Already have an account? <Link to="/">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
