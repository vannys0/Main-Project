import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import Validation from "./LoginValidation.jsx";
import { AiOutlineMail } from "react-icons/ai";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import SecureStore from "react-secure-storage";
import { AuthContext } from "../App";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(values.email)) {
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
      }, 5000);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/login-client`, values);

      if (res.data.Message === "Success") {
        const user = res.data;
        SecureStore.setItem("userToken", user);
        authContext.signIn(user);
        navigate("/home");
      } else {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    } catch (err) {
      console.error(err);
      setErrorLogin(true);
      setTimeout(() => {
        setErrorLogin(false);
      }, 5000);
    }
  };

  function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  }

  return (
    <div className="LoginSignup-div">
      <div className="main-container">
        <form onSubmit={handleSubmit}>
          <h3 className="brand-name">eLeporidae</h3>
          <h4>SIGN IN</h4>
          <div className="inputs">
            {emailError && (
              <div
                className="alert alert-warning d-flex align-items-center justify-content-center"
                role="alert"
              >
                <div>Invalid email format</div>
              </div>
            )}
            {showAlert && (
              <div
                className="d-flex align-items-center justify-content-center alert alert-warning"
                role="alert"
              >
                Incorrect email or password
              </div>
            )}
            {errorLogin && (
              <div
                className="d-flex align-items-center justify-content-center alert alert-danger"
                role="alert"
              >
                <div>An error occurred during login</div>
              </div>
            )}
            <div className="input">
              <AiOutlineMail className="icons" />
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleInput}
                required
              />
              <label htmlFor="">Enter your email</label>
              {errors.email && <p className="error">{errors.email}</p>}
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
                value={values.password}
                onChange={handleInput}
                required
              />
              <label htmlFor="">Enter your password</label>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
          </div>
          <button type="submit" className="submit login-btn">
            Login
          </button>
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
