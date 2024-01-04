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
import Swal from "sweetalert2";
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

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Login Failed",
            text: "Incorrect email or password",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred during login");
      });
  };

  return (
    <div className="LoginSignup-div">
      <div className="main-container">
        <form onSubmit={handleSubmit}>
          <h3 className="brand-name">eLeporidae</h3>
          <h4>SIGN IN</h4>
          <div className="inputs">
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
              <RiLockPasswordLine className="icons" />
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
            <div className="d-flex justify-content-end">
              <span
                className="show-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
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
