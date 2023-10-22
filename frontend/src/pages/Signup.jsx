import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import Validation from "./SignupValidation.jsx";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    Password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors(Validation(values));

  //   if (errors.name === "" && errors.email === "" && errors.password === "") {
  //     axios
  //       .post("http://localhost:8081/signup", values)
  //       .then((res) => {
  //         toast.success("Account created");
  //         navigate("/");
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/signup", values)
      .then((res) => {
        toast.success("Account created");
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          // Handle the "Email already exists" error
          toast.error("Email already exists");
        } else {
          console.log(err);
        }
      });
  };

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
          <div className="login-link">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
