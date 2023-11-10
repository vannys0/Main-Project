import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import Validation from "./SignupValidation.jsx";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
function Login() {
  const [values, setValues] = useState({
    id: uuidv4(),
    name: "",
    email: "",
    Password: "",
    user_type: "client",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [signupError, setSignUpError] = useState(null);

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));

    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setSignUpError("Email already exist!");
          } else {
            setSignUpError("");
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="LoginSignup-div">
      <div className="bg-image"></div>
      <div className="main-container">
        <div className="title-div">
          <h4 className="text">Create an account</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex align-items-center justify-content-center login-error">
            {signupError && <span className="errorMsg">{signupError}</span>}
          </div>
          <div className="inputs">
            <div className="input">
              <div className="input-group">
                <HiOutlineUser className="icons" />
                <input
                  type="text"
                  onChange={handleInput}
                  name="name"
                  placeholder="Name"
                />
              </div>
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="input">
              <div className="input-group">
                <AiOutlineMail className="icons" />
                <input
                  type="text"
                  onChange={handleInput}
                  name="email"
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
                  onChange={handleInput}
                  name="password"
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>
          <button type="submit" className="submit">
            Sign up
          </button>
          <div className="signup-link my-2">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
