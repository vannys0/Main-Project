import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import Validation from "./LoginValidation.jsx";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import SecureStore from "react-secure-storage";
import { AuthContext } from "../App";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Login() {
  const authContext = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/login-client`, values)
      .then((res) => {
        if (res.data.Message === "Success") {
          const user = res.data;
          SecureStore.setItem("userToken", user);
          authContext.signIn(user);

          navigate("/home");
        } else {
          toast.error("Incorrect Email or Password");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred during login");
      });
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
          <div className="inputs">
            <div className="input">
              <AiOutlineMail className="icons" />
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleInput}
                placeholder="Email"
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="input">
              <RiLockPasswordLine className="icons" />
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleInput}
                placeholder="Password"
                required
              />
              {errors.password && <p className="error">{errors.password}</p>}
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
