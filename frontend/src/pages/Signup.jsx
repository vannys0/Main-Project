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
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    id: uuidv4(),
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
      .post("http://localhost:8081/signup", {
        email: values.email,
        subject: "Verify your account",
        message: "Your verification code is required from the server.",
        id: values.id,
        name: values.name,
        password: values.password,
        user_type: values.user_type,
      })
      .then((res) => {
        toast.success("Account created");
        navigate("/signup/verify_account");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          toast.error("Email already exists");
        } else {
          console.log(err);
        }
      });
  };

  function getRandomFourDigitNumber() {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  function sendEmail(e) {
    e.preventDefault();

    const randomFourDigitNumber = getRandomFourDigitNumber();

    axios
      .post(BASE_URL + "/send-email", {
        email: "ivanbengcolado@gmail.com",
        subject: "Verify your account",
        message: `Your verification code is ${randomFourDigitNumber}`,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  }

  return (
    <div className="LoginSignup-div">
      <div className="bg-image"></div>
      <div className="main-container">
        <div className="title-div">
          <h4 className="text">Create an account</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <HiOutlineUser className="icons" />
              <input
                type="text"
                onChange={handleInput}
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="input">
              <AiOutlineMail className="icons" />
              <input
                type="text"
                onChange={handleInput}
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input">
              <RiLockPasswordLine className="icons" />
              <input
                type="password"
                onChange={handleInput}
                name="password"
                placeholder="Password"
                required
              />
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
