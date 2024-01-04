import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import Validation from "./SignupValidation.jsx";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed",
            text: "Email already exist",
          });
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="LoginSignup-div bg-light">
      <div className="main-container">
        <form onSubmit={handleSubmit}>
          <h3 className="brand-name">eLeporidae</h3>
          <h4>SIGN UP</h4>
          <div className="inputs">
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
              <RiLockPasswordLine className="icons" />
              <input
                type={showPassword ? "text" : "password"}
                onChange={handleInput}
                name="password"
                required
              />
              <label htmlFor="">Enter your password</label>
            </div>
            <div className="d-flex justify-content-end">
              <span
                className="show-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <button type="submit" className="submit">
            Sign up
          </button>
          <div className="signup-link">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
