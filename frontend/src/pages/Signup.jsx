import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import Validation from "./SignupValidation.jsx";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [values, setValues] = useState({
    name: "",
    email: "",
    Password: "",
    user_type: "client",
  });

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(values.email)) {
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
      }, 5000);
      return;
    }

    axios
      .post(`${BASE_URL}/signup`, {
        email: values.email,
        subject: "Verify your account",
        id: values.id,
        name: values.name,
        password: values.password,
        user_type: values.user_type,
      })
      .then((res) => {
        navigate("/signup/verify_account");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setEmailExist(true);
          setTimeout(() => {
            setEmailExist(false);
          }, 5000);
        } else {
          console.log(err);
        }
      });
  };

  function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  }

  return (
    <div className="LoginSignup-div bg-light">
      <div className="main-container">
        <form onSubmit={handleSubmit}>
          <h3 className="brand-name">eLeporidae</h3>
          <h4>SIGN UP</h4>
          <div className="inputs">
            {emailError && (
              <div
                className="alert alert-warning d-flex align-items-center"
                role="alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div>Invalid email format</div>
              </div>
            )}
            {emailExist && (
              <div
                className="d-flex align-items-center alert alert-danger"
                role="alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                Email already exist.
              </div>
            )}
            <div className="input">
              <HiOutlineUser className="icons" />
              <input type="text" onChange={handleInput} name="name" required />
              <label htmlFor="">Enter your full name</label>
            </div>
            <div className="input">
              <AiOutlineMail className="icons" />
              <input type="text" onChange={handleInput} name="email" required />
              <label htmlFor="">Enter your email</label>
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
                onChange={handleInput}
                name="password"
                required
              />
              <label htmlFor="">Enter your password</label>
            </div>
          </div>
          <button type="submit" className="submit">
            Sign up
          </button>
          <div className="signup-link">
            Already have an account? <Link to="/">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
