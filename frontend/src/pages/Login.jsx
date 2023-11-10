import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import Validation from "./LoginValidation.jsx";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";

import SecureStore from "react-secure-storage";
import { AuthContext } from "../App";

function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));

    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login-client", values)
        .then((res) => {
          if (res.data.Message === "Success") {
            const token = res.data.token; // Update this based on your API response
            SecureStore.setItem("userToken", token);
            authContext.signIn(token);
            navigate("/home");
          } else {
            setLoginError("Incorrect email or password.");
          }
        })
        .catch((err) => {
          console.error(err);
          setLoginError("An error occurred. Please try again later.");
        });
    }
  };

  return (
    <div className="LoginSignup-div">
      <div className="bg-image"></div>
      <div className="main-container">
        <div className="title-div">
          <h4 className="text">
            Welcome back! <br />
            to E-Leporidae
          </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex align-items-center justify-content-center login-error">
            {loginError && <span className="errorMsg">{loginError}</span>}
          </div>
          <div className="inputs">
            <div className="input">
              <div className="input-group">
                <AiOutlineMail className="icons" />
                <input
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                  placeholder="Email"
                />
              </div>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="input">
              <div className="input-group">
                <RiLockPasswordLine className="icons" />
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleInput}
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>
          <button type="submit" className="submit login-btn">
            Login
          </button>
          <div className="signup-link my-2">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
