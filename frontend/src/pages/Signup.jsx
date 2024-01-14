import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import Validation from "./SignupValidation.jsx";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Signup() {
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    user_type: "client",
    passwordMatch: true,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "password" || name === "confirmPassword") {
      setValues((prev) => ({
        ...prev,
        [name]: value,
        passwordMatch: prev.confirmPassword === value,
      }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(values.email)) {

      setShowAlert(true);
      setErrMessage("Please enter a valid email");
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }
    setLoading(true)

    if (values.password !== values.confirmPassword) {
      setShowAlert(true);
      setErrMessage("Passwords do not match!");
      setTimeout(() => {
        setShowAlert(false);
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
          setShowAlert(true);
          setErrMessage("Email already exists.");
          setTimeout(() => {
            setShowAlert(false);
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
            {showAlert && (
              <div
                className="d-flex justify-content-center alert alert-warning"
                role="alert"
              >
                {errMessage}
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
              <input
                type="password"
                onChange={handleInput}
                name="password"
                required
              />
              <label htmlFor="">Enter your password</label>
            </div>
            <div className="input">
              <input
                type="password"
                onChange={handleInput}
                name="confirmPassword"
                required
              />
              <label htmlFor="">Confirm your password</label>
            </div>
          </div>
          <button type="submit" className="submit login-btn" disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
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
